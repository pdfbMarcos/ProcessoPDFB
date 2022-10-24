import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import documentApi from "../api/document";
import ProjectContext from "../project/context";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import { ListItem, ListItemSeparator } from "../components/lists";
import { Form, FormField, SubmitButton } from "../components/forms";

function ReprepDocumentsListScreen({ navigation }) {
  const { project } = useContext(ProjectContext);

  const getDocumentsApi = useApi(documentApi.getDocuments);

  useEffect(() => {
    getDocumentsApi.request("/" + project + "/x/x/x/rep/p");
  }, []);

  const dataDocuments = getDocumentsApi.data;

  const handleRefresh = async ({ caixa, material, lote }) => {
    let parametros = "";
    parametros = caixa ? "/" + caixa : "";
    parametros = parametros + (material ? "/" + material : "");
    parametros = parametros + (lote ? "/" + lote : "");
    parametros = parametros + (caixa ? "" : "/x");
    parametros = parametros + (material ? "" : "/x");
    parametros = parametros + (lote ? "" : "/x");

    let tipo = "";
    tipo = caixa ? "c" : "";
    tipo = tipo + (material ? "m" : "");
    tipo = tipo + (lote ? "l" : "");
    tipo = tipo === "" ? "p" : tipo;

    getDocumentsApi.request("/" + project + parametros + "/rep" + "/" + tipo);
  };

  return (
    <Screen>
      <Form
        initialValues={{
          caixa: "",
          material: "",
          lote: "",
        }}
        onSubmit={handleRefresh}
      >
        <View style={styles.container}>
          <FormField
            autoCapitalize="characters"
            autoCorrect={false}
            icon="archive"
            name="caixa"
            placeholder="caixa"
            width={180}
          />
          <FormField
            autoCapitalize="characters"
            autoCorrect={false}
            icon="beaker-outline"
            name="material"
            placeholder="material"
            width={180}
          />
        </View>
        <View style={styles.container}>
          <FormField
            autoCapitalize="characters"
            autoCorrect={false}
            icon="sitemap"
            name="lote"
            placeholder="lote"
            width={180}
          />
          <SubmitButton title="Filtrar" width={180} />
        </View>
        <ListItemSeparator />
        <ListItemSeparator />
        <View>
          <FlatList
            data={dataDocuments}
            keyExtractor={(dataDocuments) =>
              dataDocuments.projeto +
              dataDocuments.caixa +
              dataDocuments.material +
              dataDocuments.lote
            }
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListItem
                title={"Caixa: " + item.caixa}
                subTitle={
                  "Material: " + item.material + " - Lote: " + item.lote
                }
                onPress={() => navigation.navigate(routes.REPREPDOCUMENT, item)}
              />
            )}
          />
        </View>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingStart: 10,
    paddingEnd: 10,
  },
});

export default ReprepDocumentsListScreen;
