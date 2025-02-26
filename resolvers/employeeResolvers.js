const Employee = require('../models/Employee');

const employeeResolvers = {
    Query: {
        getAllEmployees: async () => await Employee.find(),
        searchEmployeeByEid: async (_, { eid }) => await Employee.findById(eid),
        searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
            return await Employee.find({ $or: [{ designation }, { department }] });
        }
    },
    Mutation: {
        addEmployee: async (_, args) => {
            const employee = new Employee(args);
            return await employee.save();
        },
        updateEmployee: async (_, { eid, ...updates }) => {
            return await Employee.findByIdAndUpdate(eid, updates, { new: true });
        },
        deleteEmployee: async (_, { eid }) => {
            await Employee.findByIdAndDelete(eid);
            return "Employee deleted";
        }
    }
};

module.exports = employeeResolvers;
