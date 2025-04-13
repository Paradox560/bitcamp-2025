from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import csv

# --- Configuration and Setup ---
# Make sure to have the correct path to your webdriver executable.
driver = webdriver.Chrome()  # or webdriver.Firefox(), etc.
driver.maximize_window()

# URL of the main nutrition page
main_url = "https://nutrition.umd.edu/"
driver.get(main_url)

# Wait for the page to fully load (adjust timeout as needed)
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

# --- Scraping Process ---
# Find all links for menu items that lead to the label pages.
# Adjust the selector below according to the actual link markup.
# Here we use a CSS selector that looks for anchor tags with "label.aspx" in the href.
menu_links = driver.find_elements(By.CSS_SELECTOR, "a[href*='label.aspx']")

# Remove duplicate links if necessary (e.g., if the same link appears multiple times)
unique_links = {}
for link in menu_links:
    url = link.get_attribute("href")
    # Using the link text as a name; adjust according to your needs
    name = link.text.strip() if link.text.strip() else url.split("=")[-1]
    unique_links[url] = name

scraped_data = []

for url, name in unique_links.items():
    print(f"Processing: {name} - {url}")
    # Navigate directly to the label page
    driver.get(url)

    try:
        # Wait for the nutrition facts section to load.
        # Update the selector below to the element that contains the nutrition table/info.
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.nutrition-facts, table#nutrition_table")))
    except Exception as e:
        print(f"Timed out waiting for nutrition facts for {name} at {url}")
        continue

    # Extract nutrition facts. Adjust the selector to match the actual element.
    try:
        # Example: assume nutrition facts are inside a table with id "nutrition_table"
        nutrition_elem = driver.find_element(By.ID, "nutrition_table")
        nutrition_facts = nutrition_elem.text.strip()
    except Exception:
        nutrition_facts = "Not Found"
    
    # Extract ingredients. Adjust the selector accordingly.
    try:
        # Example: if there is an element with id "ingredients" containing ingredient info
        ingredients_elem = driver.find_element(By.ID, "ingredients")
        ingredients = ingredients_elem.text.strip()
    except Exception:
        ingredients = "Not Found"

    # Extract allergens. Adjust the selector accordingly.
    try:
        # Example: if allergens are shown in an element with id "allergens"
        allergens_elem = driver.find_element(By.ID, "allergens")
        allergens = allergens_elem.text.strip()
    except Exception:
        allergens = "Not Found"

    # Store the scraped information
    scraped_data.append({
        "menu_item": name,
        "url": url,
        "nutrition_facts": nutrition_facts,
        "ingredients": ingredients,
        "allergens": allergens
    })
    
    # Optionally, pause briefly and then go back to the main page or proceed to the next link.
    time.sleep(1)

# --- Save Results ---
# Write the scraped data to a CSV file.
csv_filename = "nutrition_data.csv"
with open(csv_filename, "w", newline="", encoding="utf-8") as csvfile:
    fieldnames = ["menu_item", "url", "nutrition_facts", "ingredients", "allergens"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for entry in scraped_data:
        writer.writerow(entry)

print(f"Scraping complete. Data saved in {csv_filename}")

# Close the browser
driver.quit()
