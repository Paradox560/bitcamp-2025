from flask import Flask, request, jsonify
from flask_cors import CORS

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
        halls = request.json.get("diningHall")
        allergens = request.json.get("allergens")
        diets = request.json.get("diets")
        meals = request.json.get("meals")
        result = web_scraping_function(halls, allergens, diets, meals)
        return jsonify(result), 200
    else:
        return None


if __name__ == "__main__":
    app.run(debug=True)