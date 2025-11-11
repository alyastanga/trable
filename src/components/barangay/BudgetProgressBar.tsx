import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

interface BudgetItem {
    category: string;
    allocatedAmount: number;
    totalAnnualBudget: number;
}

interface BudgetProgressBarProps {
    item: BudgetItem;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 0
    }).format(amount);
};

const BudgetProgressBar = ({ item }: BudgetProgressBarProps) => {
    const { category, allocatedAmount, totalAnnualBudget } = item;

    const percentage =
        totalAnnualBudget > 0
            ? Math.round((allocatedAmount / totalAnnualBudget) * 100)
            : 0;

    const getColor = (cat: string) => {
        switch (cat.toLowerCase()) {
            case "health":
                return "bg-red-500";
            case "infrastructure":
                return "bg-blue-500";
            case "education":
                return "bg-green-500";
            default:
                return "bg-indigo-500";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.categoryText}>{category}</Text>
                <Text style={styles.amountText}>
                    {formatCurrency(allocatedAmount)}
                </Text>
            </View>

            <View style={styles.progressWrapper}>
                <Progress size="lg" className="flex-1" value={percentage}>
                    <ProgressFilledTrack className={getColor(category)} />
                </Progress>
                <Text style={styles.percentageText}>{percentage}%</Text>
            </View>
        </View>
    );
};

export default BudgetProgressBar;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        paddingHorizontal: 5
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8
    },
    categoryText: {
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: "500",
        color: "#333"
    },
    amountText: {
        fontFamily: "MontserratSemiBold",
        fontSize: 14,
        fontWeight: "600",
        color: "#0056b3"
    },
    progressWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    percentageText: {
        fontFamily: "MontserratSemiBold",
        marginLeft: 10,
        fontSize: 12,
        fontWeight: "bold",
        width: 40,
        textAlign: "right"
    }
});
