with open("input.txt", "r") as fp:
    data = [(line[0], int(line[1])) for line in  list(map(lambda line: line.strip().split(" "), fp.readlines())) ]

cards= {
    'A': 'e',
    'K': 'd',
    'Q': 'c',
    'J': 'b',
    'T': 'a',
    '9': '9',
    '8': '8',
    '7': '7',
    '6': '6',
    '5': '5',
    '4': '4',
    '3': '3',
    '2': '2'
}
def get_rank(hand):
    unique = set(hand)
    max_frequency = max({char: hand.count(char) for char in unique}.values())
    return int(hex(30 + (len(hand) + 1 - len(unique))  * max_frequency) + "".join( cards[card] for card in hand), 16)

sorted_by_rank = list(map(lambda hand: hand[1], sorted(data, key=lambda p: get_rank(p[0]))))
print(data)
result = sum(map(lambda score: (score[0] + 1) * score[1],  enumerate(sorted_by_rank)))
print(result)
