import json

with open('src/data/wordle-All.json', 'r') as f:
    words = json.load(f)

numberOfWords = len(words) * 5

numberOfRepeatLetteredWords = 0

for word in words:
  wordAsSet = set(word)
  if(len(wordAsSet) < 5):
    numberOfRepeatLetteredWords += 1

print(numberOfRepeatLetteredWords)
print(numberOfRepeatLetteredWords/numberOfWords)
