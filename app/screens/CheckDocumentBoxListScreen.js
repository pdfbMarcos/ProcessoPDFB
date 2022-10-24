import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import documentApi from "../api/document";
import ProjectContext from "../project/context";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import {
  ListItem,
  ListItemCheckBoxAction,
  ListItemSeparator,
} from "../components/lists";
import { Form, FormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";

function CheckBoxListScreen({ navigation }) {
  const { project } = useContext(ProjectContext);

  const getDocumentsApi = useApi(documentApi.getDocuments);
  useEffect(() => {
    getDocumentsApi.request("/" + project + "/x/x/x/cxs/p");
  }, []);
  const dataDocuments = getDocumentsApi.data;

  const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

  const handleDocumentBoxCheck = async (newDocumentInfo) => {
    const params =
      "/" +
      newDocumentInfo.projeto +
      "/" +
      newDocumentInfo.caixa +
      "/" +
      newDocumentInfo.material +
      "/" +
      newDocumentInfo.lote +
      "/cxs";

    const result = await documentApi.updDocument({ dtCaixa: today }, params);

    if (!result.ok) {
      return alert(
        "Não foi possivel atualizar o documento!" + result.originalError
      );
    }
    alert("Sucesso! Documento conferido!");
  };

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

    getDocumentsApi.request("/" + project + parametros + "/cxs" + "/" + tipo);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Projeto: {project}</Text>
      </View>
      <Form
        initialValues={{
          caixa: "",
          material: "",
          lote: "",
        }}
        onSubmit={handleRefresh}
      >
        <View style={styles.filter}>
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
        <View style={styles.filter}>
          <FormField
            autoCapitalize="characters"
            autoCorrect={false}
            icon="sitemap"
            name="lote"
            placeholder="lote"
            width={180}
          />
          <SubmitButton marginLeft={5} title="Filtrar" width={175} />
        </View>
        <View>
          <FlatList
            data={dataDocuments}
            keyExtractor={(dataDocuments) =>
              dataDocuments.proejto +
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
                onPress={() => navigation.navigate(routes.DOCUMENT, item)}
                renderRightActions={() => (
                  <ListItemCheckBoxAction
                    onPress={() => handleDocumentBoxCheck(item)}
                  />
                )}
              />
            )}
          />
        </View>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 2 },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  titleContainer: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 35,
    margin: 15,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingStart: 10,
    paddingEnd: 10,
  },
});

export default CheckBoxListScreen;
