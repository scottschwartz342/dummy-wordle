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

After hitting enter, letters will change color. The follow is what each color represents.

- Black: not in the word
- Yellow: in the word but not in the correct spot
- Green: in the correct spot
- Red: already guessed and is Black

## How does the AI work

The AI component actually turned out to be pretty simple. As part of the backend, there is a dictionary of words that are guessable. The probabilities of each letter appearing in a word is precalculated. When the AI needs to make a guess, it iterates over the list of guessable words and does two things:

1. Prunes: removes words that are not possible/plausible
   - Words containing black letters (letters that are not in the solution word)
   - Words containing yellow letters in spots that have already been guessed
   - Words that do not contain green letters in proper position
2. Keep track of the best guess
   - Calculates probability of each word
   - Updates best guess if necessary

## How the probability of word is calculated

Calculating the probability is based off of bayes Theorem. The probability of a word, $W$ given the evidence, $E$, (in this case the letters that are black, yellow, or green), is equal to:

$$
P(W|E) = \frac{P(E|W)P(W)}{P(E)}
$$

$P(F)$ can be ignored as it is the normalization constant. $P(E|W)$ turns out to be either be 0 or 1. For example, say we know we need $T$ to be in the word because it is yellow. If the word is $Boots$ the $P(T_{yellow}|BOOTS) = 1$. If the word is $Alien$, $P(T_{yellow}|ALIEN)$ = 0. Since words that do not agree with the evidence, $P(E|W) = 0$, is pruned, $P(E|W)$ can be ignored because it will always be 1.

That leaves the probability to be based off of $P(W)$. For simplicity, the letters, $x_1, ... x_5$, are assumed to be independent. This allows us to just use the product rule:

$$
P(W) = \prod_{i=1}^5 P(x_i)
$$

One other thing is added to favor words that do not have repeating letters. If a word has a repeating letter, its probability is multiplied by $0.07$, which comes from the frequency of words with repeating letters in the dictionary used.
