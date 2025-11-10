import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BudgetProgressBar from "./BudgetProgressBar";

interface BudgetItem {
    year: number;
    category: string;
    allocatedAmount: number;
}

interface BudgetViewProps {
    data: BudgetItem[];
}

const BudgetView = ({ data }: BudgetViewProps) => {
    const groupedData = data.reduce(
        (acc, item) => {
            const year = item.year.toString();
            if (!acc[year]) {
                acc[year] = {
                    items: [],
                    totalBudget: 0
                };
            }
            acc[year].items.push(item);
            acc[year].totalBudget += item.allocatedAmount;
            return acc;
        },
        {} as { [key: string]: { items: BudgetItem[]; totalBudget: number } }
    );

    const renderBudgetSection = ([year, data]: [
        string,
        { items: BudgetItem[]; totalBudget: number }
    ]) => (
        <View key={year} style={styles.yearSection}>
            <Text style={styles.yearTitle}>Budget Allocation - {year}</Text>

            <FlatList
                data={data.items}
                keyExtractor={(item, index) =>
                    `${year}-${item.category}-${index}`
                }
                renderItem={({ item }) => (
                    <BudgetProgressBar
                        item={{ ...item, totalAnnualBudget: data.totalBudget }}
                    />
                )}
                scrollEnabled={false}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {Object.entries(groupedData).map(renderBudgetSection)}

            {data.length === 0 && (
                <Text style={styles.emptyText}>
                    No budget information available.
                </Text>
            )}
        </View>
    );
};

export default BudgetView;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    yearSection: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41
    },
    yearTitle: {
        fontSize: 18,
        fontFamily: "MontserratBold",
        marginBottom: 10,
        color: "#333",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 5
    },
    emptyText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: "#000000ff"
    }
});
