import requests
import json

def get_weather(lat=40.7128, lon=-74.0060):
    # You'll need to replace this with your actual OpenWeatherMap API key
    api_key = "YOUR_API_KEY"
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    
    params = {
        "lat": lat,
        "lon": lon,
        "appid": api_key,
        "units": "metric"  # Use metric units
    }
    
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        
        if response.status_code == 200:
            weather = {
                "temperature": data["main"]["temp"],
                "description": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"]
            }
            return weather
        else:
            return f"Error: {data['message']}"
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    weather = get_weather()
    if isinstance(weather, dict):
        print(f"Weather at coordinates 40.7128° N, 74.0060° W:")
        print(f"Temperature: {weather['temperature']}°C")
        print(f"Description: {weather['description']}")
        print(f"Humidity: {weather['humidity']}%")
        print(f"Wind Speed: {weather['wind_speed']} m/s")
    else:
        print(weather) 