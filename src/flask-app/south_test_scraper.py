from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
from bs4 import BeautifulSoup
import requests
import re
import csv

# Food -> [allergens_list: list of strings, serving size:str ,calories: str,fat: str,carbs: str,protein: str]
section_names = []
sections_contents = []
breakfast_divs = []
lunch_divs = []
dinner_divs = []

breakfast_dict = {}
lunch_dict = {}
dinner_dict = {}

no_info_items = ["Diced Ham", "Vegan Vanilla Soy-Free Yogurt", "Chocolate Muffin", "Ham Sliced", "Pico de Gallo"]

allergens_list = ["Contains dairy", "Contains egg", "Contains gluten", "Contains soy", "Contains nuts", "Contains sesame", "Contains fish", "Contains shellfish", "vegan", "vegetarian", "HalalFriendly"]

def parse_my_html(html_content):
    # Create a soup object from the html
    soup = BeautifulSoup(html_content, 'html.parser')
    # get every card div
    cards = soup.find_all('div', attrs={'class': 'card'})
    for card in cards:
        #print the h5 tag

        card_h5 = card.find('h5', attrs={'class': 'card-title'})

        # Convert the card to a soup object
        card_soup = BeautifulSoup(str(card), 'html.parser')
        # get the h5 of that card
        card_name = card_soup.find('h5', attrs={'class': 'card-title'}).text.strip()

        section_names.append(card_name)
        sections_contents.append(card)

def get_and_click_links(html_content,meal,meal_dict):
    print(meal)

    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Get the h5 for the row
    card_h5 = soup.find('h5', attrs={'class': 'card-title'})
    print(card_h5.text.strip())

    # Get each row 
    rows = soup.find_all('div', attrs={'class': 'row menu-item-row'})
    print("We've stepped in")

    # Loop over each row and get the name of the item and all of it's allergens
    for row in rows:
        # Get the name of the item
        item_name = row.find('a', attrs={'class': 'menu-item-name'}).text.strip()
        if item_name in no_info_items:
            continue
        allergens_div = str(row.find('div', attrs={'class': 'col-md-4'}))

        temp_allergens_list = []

        for a in allergens_list:
            if a in allergens_div:
                temp_allergens_list.append(re.sub(r"Contains", "", a))

        meal_dict[item_name] = []
        meal_dict[item_name].append(temp_allergens_list)


        # Click into the food
        food_link = row.find('a', attrs={'class': 'menu-item-name'})['href']
        food_url = "https://nutrition.umd.edu/" + food_link
        r = requests.get(food_url)
        food_soup = BeautifulSoup(r.content, 'html.parser')

        # Get the serving size
        serving_size = food_soup.find_all('div', attrs={'class': 'nutfactsservsize'})
        if len(serving_size)!=0:
            serving_size = serving_size[-1].text.strip()
            meal_dict[item_name].append(serving_size)

        

            # Get the calories per serving
            all_ps = food_soup.find_all('p')
            for i,p in enumerate(all_ps):
                if "Calories per serving" in str(p):
                    calories = all_ps[i+1].text.strip()
                    meal_dict[item_name].append(calories)
                    
                    break
            
            nutrients_spans = food_soup.find_all('span', attrs={'class': 'nutfactstopnutrient'})

            for n in nutrients_spans:
                if "Total Fat" in str(n):
                    fat = n.text.strip()
                    meal_dict[item_name].append(re.sub(r"[^0-9.]", "", fat))
                elif "Total Carbohydrate" in str(n):
                    carbs = n.text.strip()
                    carbs = re.sub(r"[^0-9.]", "", carbs)
                    meal_dict[item_name].append(carbs[1:])
                elif "Protein" in str(n):
                    protein = n.text.strip()
                    meal_dict[item_name].append(re.sub(r"[^0-9.]", "", protein))
            
            # remove the last item in the meal list
            meal_dict[item_name].pop()

            print(item_name, meal_dict[item_name])
                            

def save_to_csv(breakfast_dict, lunch_dict, dinner_dict, filename="south_menu_data.csv"):
    """
    Save the meal data from the dictionaries into a CSV file.
    """
    # Define the CSV headers
    headers = ["Item Name", "Allergens", "Serving Size", "Calories", "Fat", "Carbs", "Protein", "Meal"]
    
    # Combine all meal dictionaries into one
    combined_dict = {
        "Breakfast": breakfast_dict,
        "Lunch": lunch_dict,
        "Dinner": dinner_dict
    }
    
    # Open the CSV file for writing
    with open(filename, mode="w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        
        # Write the header row
        writer.writerow(headers)
        
        # Write the data rows
        for meal, meal_dict in combined_dict.items():
            for item_name, item_data in meal_dict.items():
                # Ensure all fields are present, filling missing ones with empty strings
                allergens = ", ".join(item_data[0]) if len(item_data) > 0 else ""
                serving_size = item_data[1] if len(item_data) > 1 else ""
                calories = item_data[2] if len(item_data) > 2 else ""
                fat = item_data[3] if len(item_data) > 3 else ""
                carbs = item_data[4] if len(item_data) > 4 else ""
                protein = item_data[5] if len(item_data) > 5 else ""
                meal = meal
                
                # Write the row to the CSV
                writer.writerow([item_name, allergens, serving_size, calories, fat, carbs, protein, meal])
    
    print(f"Data successfully saved to {filename}")        


def save_umd_menu_html(url):
    """
    Navigate to UMD menu website, click on each meal section,
    and save the raw HTML content to separate files.
    """
    # Set up Chrome options
    options = Options()
    options.add_argument("--headless")  # Run in headless mode (no browser UI)
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    
    # Initialize the driver
    driver = webdriver.Chrome(options=options)
    
    try:
        # Navigate to the website
        driver.get(url)
        print(f"Navigated to {url}")
        
        # Wait for page to load
        time.sleep(3)
        
        # Meal sections to click through

        
        try:

            
            # Get the page source (HTML content)
            html_content = driver.page_source
            
            # Save HTML to file
            filename = f"umd_menu.html"
            with open(filename, 'w', encoding='utf-8') as file:
                file.write(html_content)
            
            print(f"Saved to HTML content to {filename}")

            parse_my_html(html_content)

            for i in range(len(section_names)):
                # Click on each meal section
                if 0 <= i <= 10:
                    breakfast_divs.append(sections_contents[i])
                elif 11 <= i <= 33:
                    lunch_divs.append(sections_contents[i])
                elif i > 33:
                    dinner_divs.append(sections_contents[i])
            
            for b_div in breakfast_divs:
                get_and_click_links(str(b_div), "breakfast", breakfast_dict)
            print(f"Breakfast: {breakfast_dict}")
            print()
            print()
            for l_div in lunch_divs:
                get_and_click_links(str(l_div), "lunch", lunch_dict)
            print(f"Lunch: {lunch_dict}")
            print()
            print()
            for d_div in dinner_divs:
                get_and_click_links(str(d_div), "dinner", dinner_dict)
            print(f"Dinner: {dinner_dict}")
                
            save_to_csv(breakfast_dict, lunch_dict, dinner_dict)
            
            

        except Exception as e:
            print(f"Error processing: {str(e)}")
    
    finally:
        # Close the browser
        driver.quit()
        print("Browser closed")



if __name__ == "__main__":
    # URL to scrape
    url = "https://nutrition.umd.edu/?locationNum=16&dtdate=4/16/2025"
    
    # Save HTML content for each meal section
    save_umd_menu_html(url)