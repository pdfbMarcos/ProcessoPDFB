import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import documentApi from "../api/document";
import RadioButton from "../components/RadioButton";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";
import { ListItemSeparator } from "../components/lists";

const validationSchema = Yup.object().shape({
  dtCaptura: Yup.string()
    .required()
    .max(10)
    .min(10)
    .label("Data da digitalização"),
  lotePDF: Yup.string().required().label("LotePDF"),
  qtdPag: Yup.string().required().label("Páginas"),
});

function DigDocumentScreen({ route, navigation }) {
  const targetDocument = route.params;
  const params =
    "/" +
    targetDocument.projeto +
    "/" +
    targetDocument.caixa +
    "/" +
    targetDocument.material +
    "/" +
    targetDocument.lote +
    "/dig";
  const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
  const data = [{ value: "Sim" }, { value: "Não" }];

  const [option, setOption] = useState("Sim");

  const handleSubmit = async (newDocumentInfo, { resetForm }) => {
    if (option === null) {
      return alert("Informar se este documento precisa de fotos!");
    }

    newDocumentInfo.doctoFP = option;
    const result = await documentApi.updDocument(newDocumentInfo, params);

    if (!result.ok) {
      return alert(
        "Não foi possivel atualizar o documento!" + result.originalError
      );
    }

    alert("Success!");

    resetForm();
    navigation.navigate(routes.DIGDOCUMENTSLIST);
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          dtCaptura: today,
          lotePDF: "",
          qtdPag: "",
          doctoFP: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.container}>
          <Text>Caixa: {targetDocument.caixa}</Text>
          <Text>Material: {targetDocument.material}</Text>
          <Text>Lote: {targetDocument.lote}</Text>
          <Text>Projeto: {targetDocument.projeto}</Text>
        </View>
        <ListItemSeparator />
        <ListItemSeparator />
        <FormField
          autoCorrect={false}
          defaultValue={today}
          icon="calendar"
          name="dtCaptura"
          placeholder="Data da digitalização"
          width={180}
        />
        <FormField
          autoCorrect={false}
          icon="sitemap"
          keyboardType="numeric"
          name="lotePDF"
          placeholder="LotePDF"
          width={180}
        />
        <FormField
          autoCorrect={false}
          icon="file-document-outline"
          keyboardType="numeric"
          name="qtdPag"
          placeholder="Páginas"
          width={180}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.paragraph}>Fazer fotos?</Text>
          <RadioButton data={data} onSelect={(value) => setOption(value)} />
        </View>
        <ListItemSeparator />
        <ListItemSeparator />
        <SubmitButton title="Atualizar documento" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DigDocumentScreen;
