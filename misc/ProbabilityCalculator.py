from copy import deepcopy
import json

with open('./public/wordle-All.json', 'r') as f:
    words = json.load(f)

letterFrequencies = {
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 0,
    'i': 0,
    'j': 0,
    'k': 0,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 0,
    'q': 0,
    'r': 0,
    's': 0,
    't': 0,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0
}

numOfLetters = len(words) * 5

for word in words:
    for letter in word:
        letterFrequencies[letter] = letterFrequencies[letter] + 1

# print(letterFrequencies)

letterProbabilities = deepcopy(letterFrequencies)

for key, val in letterProbabilities.items():
  letterProbabilities[key] = val / numOfLetters;

with open('./public/letterProbabilities.json', 'w') as fp:
    json.dump(letterProbabilities, fp)

# check = 0

# for val in letterProbabilities.values():
#   check = check + val

# print(check == 1)