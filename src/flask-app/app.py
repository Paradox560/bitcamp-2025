from flask import Flask, request, jsonify
from flask_cors import CORS
from ingredient_filtering import filter_ingredients

app = Flask(__name__)
CORS(app, origins="http://localhost:5000")

# Test API
@app.route('/api/test', methods=['POST'])
def test():
    if request.method == 'POST':
        data = request.json.get("data")
        return jsonify(data), 200
    else:
        return None
    
# Run the web scraping script
@app.route('/api/scrape', methods=['POST'])
def scrape():
    if request.method == 'POST':
        # Here you would call your web scraping function
        # For example: result = web_scraping_function()
        dining_hall = request.json.get("diningHall")
        for i in range(len(dining_hall)):
            if (dining_hall[i] == "Yahentamitsi"):
                dining_hall[i] = "y"
            elif (dining_hall[i] == "South"):
                dining_hall[i] = "south"
        allergens = request.json.get("allergens")
        for i in range(len(allergens)):
            allergens[i] = allergens[i].lower()
        diets = request.json.get("diets")
        for i in range(len(diets)):
            if (diets[i] == "Vegetarian"):
                diets[i] = "vegetarian"
            elif (diets[i] == "Vegan"):
                diets[i] = "vegan"
        meals = request.json.get("meals")
        # print(dining_hall, allergens, diets, meals)
        result = filter_ingredients(dining_hall, allergens, diets, meals)
        # print(result)
        return jsonify(result), 200
    else:
        return None


if __name__ == "__main__":
    app.run(debug=True)