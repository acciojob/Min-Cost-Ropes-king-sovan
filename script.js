function mincost(arr) {
    // Create a min-heap
    const heap = new MinHeap(arr);
    let totalCost = 0;

    // While there's more than one rope
    while (heap.size() > 1) {
        // Extract the two shortest ropes
        const first = heap.extract();
        const second = heap.extract();

        // Connect them and add the cost
        const cost = first + second;
        totalCost += cost;

        // Add the new rope back to the heap
        heap.insert(cost);
    }

    return totalCost;
}

// MinHeap implementation
class MinHeap {
    constructor(array) {
        this.heap = [];
        array.forEach(item => this.insert(item));
    }

    insert(item) {
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    extract() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let smallestIndex = index;
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex === index) break;

            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            index = smallestIndex;
        }
    }

    size() {
        return this.heap.length;
    }
}

module.exports = mincost;
