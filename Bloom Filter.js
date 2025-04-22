class BloomFilter {
  /**
   * @param {number} size - The size of the bit array.
   * @param {number} hashCount - The number of hash functions to use.
   */
  constructor(size, hashCount) {
    this.size = size; // Size of the bit array
    this.hashCount = hashCount; // Number of hash functions
    this.bitArray = new Array(size).fill(0); // Initialize bit array with 0s
  }

  /**
   * Hash function generator.
   * @param {string} item - The item to hash.
   * @param {number} seed - A seed value for the hash function.
   * @returns {number} - A hash value within the range of the bit array.
   */
  hash(item, seed) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash << 5) + hash + item.charCodeAt(i) + seed;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash % this.size);
  }

  /**
   * Add an item to the Bloom Filter.
   * @param {string} item - The item to add.
   */
  add(item) {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(item, i);
      this.bitArray[index] = 1;
    }
  }

  /**
   * Check if an item might be in the Bloom Filter.
   * @param {string} item - The item to check.
   * @returns {boolean} - True if the item might be in the filter, false otherwise.
   */
  mightContain(item) {
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(item, i);
      if (this.bitArray[index] === 0) {
        return false; // Definitely not in the set
      }
    }
    return true; // Possibly in the set
  }
}

// Example Usage:
const bloomFilter = new BloomFilter(100, 3); // Bit array size = 100, 3 hash functions

// Adding items to the Bloom Filter
bloomFilter.add("apple");
bloomFilter.add("banana");
bloomFilter.add("cherry");

// Checking for membership
console.log(bloomFilter.mightContain("apple")); // true (probably in the set)
console.log(bloomFilter.mightContain("grape")); // false (definitely not in the set)
console.log(bloomFilter.mightContain("banana")); // true (probably in the set)
console.log(bloomFilter.mightContain("orange")); // false (definitely not in the set)
