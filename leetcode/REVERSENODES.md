# Reverse Nodes in k-Group

Here we have A⇾B⇾C⇾D⇾E⇾F⇾G and we want to reverse k=3 at a time to get (C⇾B⇾A) ⇾ (F⇾E⇾D) ⇾ G

To reverse singly linked list you need a reference to the 1st three nodes

```
   e  f  g
x->A->B->C->D->y
```

With that we should be able to reverse the items between `x` and `y`.

```
Step 1: A -> y
Step 2: B -> A
Step 3: C -> B
Step 4: D -> C
...
Final: x -> D
```

## Step 1: A->y

```
e = x.next (A)
f = e.next (B)
e.next = y (A->y)
```

## Step 2: B->A

```
g = f.next (C)
f.next = e (B->A)
```

## Step 3 and 4

```
while g != y
    e = f
    f = g
    g = g.next
    f.next = e
end while
```

## Final: x->D

```
    x.next = f
```

For this problem, we need to compute `x` and `y` based on the `k` value.
