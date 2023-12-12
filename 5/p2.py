from input import mappings, keys, seeds
from functools import reduce
from multiprocessing import Pool
import multiprocessing

def calcuate_location(seed: int):
    return reduce(lambda acc, key: mappings[key][acc], keys, seed)

def process_range(r):
    print("processing range", r)
    min_location = float('inf')

    for seed in range(r[0], r[1]):
        min_location = min(min_location, calcuate_location(seed))
    print('done range', min_location, r)
    return min_location

def split_range_into_chunks(range_tuple):
    start, end = range_tuple
    num_cores = multiprocessing.cpu_count()
    chunk_size = (end - start) // num_cores
    chunks = []

    for i in range(num_cores):
        chunk_start = start + i * chunk_size
        chunk_end = start + (i + 1) * chunk_size if i < num_cores - 1 else end
        chunks.append((chunk_start, chunk_end))

    return chunks

if __name__ == "__main__":
    ranges = []
    res = float('inf')
    for i in range(len(seeds)):
        if i%2:
            ranges.append((seeds[i-1], seeds[i-1] + seeds[i]))

    range_results = []
    for ra in ranges:
        chunks = split_range_into_chunks(ra)
        with Pool() as pool:
            results = pool.map(process_range, chunks)
            range_results.append(min(results))
    print("Results" ,range_results)
    print("Grand total: " , min(range_results))
