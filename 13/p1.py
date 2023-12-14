with open('itest1', 'r') as fp:
    data = [ p.split('\n') for p in fp.read().strip().split('\n\n') ]

print(data)
