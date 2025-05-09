# Dummy Wordle

Dummy Wordle is based off of the New York Times viral game Wordle. You have six chances to guess a 5-lettered word.

Dummy Wordle also features an AI Guess and AI Solve feature.

### Tools Used

- React
- TypeScript
- Jest
- Git
- GitHub

## How to Play

1. Type out your guess
2. Press Enter to submit your guess
3. Press AI Guess or AI Solve button to get AI assistance

## How does the AI work?

The AI component actually turned out to be pretty simple. As part of the backend, there is a dictionary of words that are guessable. The probabilities of each letter appearing in a word is precalculated. When the AI needs to make a guess, it iterates over the list of guessable words doing two things:

1. Pruning: removing words that are not possible/plausible
   - Words containing black letters (letters that are not in the solution word)
   - Words containing yellow letters in spots that have already been guessed
   - Words that do not contain green letters in proper position
2. Keeping track of the best guess
   - Calculating probability of word
   - Updating best guess if necessary

Note on how probability is calculated:

TLDR: self admittedly, not the best.
