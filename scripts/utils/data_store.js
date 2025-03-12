class DataStore {
    // Private properties to store fetched data
    static #categories = null;
    static #subCategories = null;
    static #products = null;

    /**
     * Retrieves categories data.
     * Fetches data only if it's not already loaded.
     * @returns {Promise<Array>} List of categories
     */
    static async getCategories() {
        return this.#categories ?? await this.#fetchData("categories");
    }

    /**
     * Retrieves subcategories data.
     * Fetches data only if it's not already loaded.
     * @returns {Promise<Array>} List of subcategories
     */
    static async getSubCategories() {
        return this.#subCategories ?? await this.#fetchData("subCategories");
    }

    /**
     * Retrieves products data.
     * Fetches data only if it's not already loaded.
     * @returns {Promise<Array>} List of products
     */
    static async getProducts() {
        return this.#products ?? await this.#fetchData("products");
    }

    /**
     * Retrieves a product by its ID.
     * @param {number} productId - The ID of the product to find
     * @returns {Promise<Object>} The product object
     */
    static async getProductById(productId) {
        const products = await this.getProducts();
        return products.find((product) => product.product_id == productId);
    }

    /**
     * Fetches data from a JSON file and caches it.
     * @param {string} type - The type of data to fetch (categories, subCategories, or products).
     * @returns {Promise<Array>} The fetched data
     */
    static async #fetchData(type) {
        try {
            const response = await fetch(`/data/${type}.json`);
            const data = await response.json();

            // Store the fetched data in the corresponding private property
            this[`#${type}`] = data[type] || [];
            return this[`#${type}`];
        } catch (error) {
            console.error(`Error loading ${type}:`, error);
            return [];
        }
    }

    /**
     * Forces a refresh by clearing cached data and fetching new data.
     * @param {string} type - The type of data to refresh (categories, subCategories, or products).
     * @returns {Promise<Array>} The updated data
     */
    static async refreshData(type) {
        this[`#${type}`] = null; // Clear cached data
        return await this.#fetchData(type);
    }
}

// Export the DataStore for use in other modules
export default DataStore;