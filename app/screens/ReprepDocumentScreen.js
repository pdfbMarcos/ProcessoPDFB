import React from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import documentApi from "../api/document";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";
import { ListItemSeparator } from "../components/lists";

const validationSchema = Yup.object().shape({
  dtReprep: Yup.string()
    .required()
    .max(10)
    .min(10)
    .label("Data da repreparação"),
  caixaPDF: Yup.string().label("Caixa PDF"),
  qtdImg: Yup.string().required().label("Qtd Fotos"),
});

function ReprepDocumentScreen({ route, navigation }) {
  const document = route.params;
  const params =
    "/" +
    document.projeto +
    "/" +
    document.caixa +
    "/" +
    document.material +
    "/" +
    document.lote +
    "/rep";

  const handleSubmit = async (document, { resetForm }) => {
    const result = await documentApi.updDocument(document, params);

    if (!result.ok) {
      return alert(
        "Não foi possivel atualizar o documento!" + result.originalError
      );
    }
    alert("Success!");

    resetForm();
    navigation.navigate(routes.REPREPDOCUMENTSLIST);
  };

  const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          dtReprep: today,
          caixaPDF: "",
          qtdImg: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.container}>
          <Text>Caixa: {document.caixa}</Text>
          <Text>Material: {document.material}</Text>
          <Text>Lote: {document.lote}</Text>
          <Text>Projeto: {document.projeto}</Text>
        </View>
        <ListItemSeparator />
        <ListItemSeparator />
        <FormField
          autoCorrect={false}
          defaultValue={today}
          icon="calendar"
          name="dtReprep"
          placeholder="Data da repreparação"
          width={180}
        />
        <FormField
          autoCorrect={false}
          icon="archive"
          keyboardType="numeric"
          name="caixaPDF"
          placeholder="CaixaPDF"
          width={180}
        />
        <FormField
          autoCorrect={false}
          icon="image-outline"
          keyboardType="numeric"
          name="qtdImg"
          placeholder="Qtd Fotos"
          width={180}
        />
        <ListItemSeparator />
        <ListItemSeparator />
        <SubmitButton title="Atualizar documento" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
});

export default ReprepDocumentScreen;
