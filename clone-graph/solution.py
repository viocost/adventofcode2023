"""
# Definition for a Node.
"""

class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

from typing import Optional
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None

        nodes = set()
        vertices = set()

        clone = {}

        def walk(node):
            if node.val in nodes:
                return
            nodes.add(node.val)
            for neighbor in node.neighbors:
                vertices.add((node.val, neighbor.val))
                walk(neighbor)

        for vertex in vertices:
            if vertex[0] not in clone:
                clone[vertex[0]] = Node(vertex[0])
            if vertex[1] not in clone:
                clone[vertex[1]] = Node(vertex[1])

            n1, n2 = clone[vertex[0]], clone[vertex[1]]
            if n1 not in n2.neighbors:
                n2.neighbors.append(n1)
            if n2 not in n1.neighbors:
                n1.neighbors.append(n2)

        return clone[node.val]
