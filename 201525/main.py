
initial = 20151125
multiplier = 252533
diviser = 33554393

cur_num = initial
diagonal = 1
row, col = 1, 1

while row != 3010 or col != 3019:
    if col == diagonal:
        diagonal += 1
        row = diagonal
        col = 1
    else:
        col +=1
        row -=1

    cur_num = cur_num * multiplier % diviser



print(cur_num)
