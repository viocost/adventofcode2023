with open("input.txt", "r") as fp:
    data = [(line[0], int(line[1])) for line in  list(map(lambda line: line.strip().split(" "), fp.readlines())) ]

cards= {
    'A': 'd',
    'K': 'c',
    'Q': 'b',
    'T': 'a',
    '9': '9',
    '8': '8',
    '7': '7',
    '6': '6',
    '5': '5',
    '4': '4',
    '3': '3',
    '2': '2',
    'J': '1'
}
def get_rank(hand):
    unique = set(hand).difference('J')
    j_count = hand.count('J')
    l_unique = len(unique) or 1
    max_frequency = max({char: hand.count(char) for char in unique}.values()) + j_count if len(unique)  > 0 else 5

    return int(hex(30 + (len(hand) + 1 - l_unique)  * max_frequency ) + "".join( cards[card] for card in hand), 16)

sorted_by_rank = list(map(lambda hand: hand[1], sorted(data, key=lambda p: get_rank(p[0]))))

result = sum(map(lambda score: (score[0] + 1) * score[1],  enumerate(sorted_by_rank)))
print(result)

# 251421071
