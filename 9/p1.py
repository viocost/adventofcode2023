with open('input', 'r') as fp:
    data = list(map(
        lambda line: list(map(int, line)),
        list(map(lambda line: line.strip().split(' '), fp.readlines()))
    ))
def get_next_value_p1(numbers):
    if numbers[-1] == 0 and len(set(numbers)) == 1:
        return 0
    return numbers[-1] + get_next_value_p1([numbers[i] - numbers[i - 1] for i in range(1, len(numbers))])

def get_next_value_p2(numbers):
    if numbers[0] == 0 and len(set(numbers)) == 1:
        return 0
    return  numbers[0] - get_next_value_p2([numbers[i] - numbers[i - 1] for i in range(1, len(numbers))])

print(sum(map(get_next_value_p1, data)))
print(sum(map(get_next_value_p2, data)))
