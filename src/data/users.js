export const fetchUsers = async (page) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
};