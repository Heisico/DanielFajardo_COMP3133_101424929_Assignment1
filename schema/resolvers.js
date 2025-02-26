const Employee = require('../models/Employee');
const User = require('../models/User'); // Import User model

const resolvers = {
    Query: {
        employees: async () => {
            try {
                return await Employee.find();
            } catch (error) {
                console.error("Error fetching employees:", error);
                throw new Error("Failed to fetch employees");
            }
        },
        users: async () => { 
            try {
                return await User.find();
            } catch (error) {
                console.error("Error fetching users:", error);
                throw new Error("Failed to fetch users");
            }
        }
    },
    Mutation: {
        addEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
            try {
                console.log("Adding Employee:", { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo });

                const newEmployee = new Employee({
                    first_name,
                    last_name,
                    email,
                    gender,
                    designation,
                    salary,
                    date_of_joining: new Date(date_of_joining), // Ensure proper date conversion
                    department,
                    employee_photo
                });

                await newEmployee.save();
                console.log("Employee added successfully:", newEmployee);
                return newEmployee;
            } catch (error) {
                console.error("Error adding employee:", error.message);
                throw new Error("Failed to add employee: " + error.message);
            }
        },
        addUser: async (_, { username, email, password }) => { // Add addUser mutation
            try {
                console.log("Adding User:", { username, email });

                const newUser = new User({ username, email, password });
                await newUser.save();
                console.log("User added successfully:", newUser);
                return newUser;
            } catch (error) {
                console.error("Error adding user:", error.message);
                throw new Error("Failed to add user: " + error.message);
            }
        }
    }
};

module.exports = resolvers;
