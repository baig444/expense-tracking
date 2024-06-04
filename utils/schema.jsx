import {serial, varchar,pgTable, integer, numeric} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: varchar("amount"),
    icon:varchar("icon"),
    createdBy: varchar("createdBy"),
})

export const Expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount").notNull().default(0),
    icon:varchar("icon"),
    date: varchar("date"),
    createdBy: varchar("createdBy"),
    budgetId: integer("budgetId").notNull().references(() => Budgets.id),

})