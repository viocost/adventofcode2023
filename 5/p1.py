from input import mappings, keys, seeds
from functools import reduce

def calcuate_location(seed: int):
    return reduce(lambda acc, key: mappings[key][acc], keys, seed)

if __name__ == "__main__":
    print(min(list(map(calcuate_location, seeds))))
