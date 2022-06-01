import React from "react";
import { Text, FlatList } from "react-native";

import produtos from "./produtos";

export default () => {
    const produtoRender = ({ item }) => {
        return <Text>{item.nome}</Text>;
    };

    return (
        <>
            <Text>ListProduct</Text>
            <FlatList 
                data={produtos}
                keyExtractor={produto => `${produto.id}`}
                renderItem={produtoRender}
            />
        </>
    )
}
