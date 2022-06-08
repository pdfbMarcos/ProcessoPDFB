import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import documentApi from "../api/document";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { ListItemSeparator } from "../components/lists";

const validationSchema = Yup.object().shape({
  caixa: Yup.string().required().label("Caixa"),
  material: Yup.string().required().label("Material"),
  lote: Yup.string().required().label("Lote"),
  dtPreparacao: Yup.string()
    .required()
    .max(10)
    .min(10)
    .label("Data da preparação"),
});

function AddDocumentScreen(props) {
  const handleSubmit = async (document, { resetForm }) => {
    const result = await documentApi.addDocument(document);

    if (!result.ok) {
      return alert("Could not save the document!");
    }
    alert("Success!");

    resetForm();
  };

  const projeto = "inovatgq";
  const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          caixa: "",
          material: "",
          lote: "",
          dtPreparacao: today,
          projeto: projeto,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="characters"
          autoCorrect={false}
          icon="archive"
          name="caixa"
          placeholder="Caixa"
        />
        <FormField
          autoCapitalize="characters"
          autoCorrect={false}
          icon="beaker-outline"
          name="material"
          placeholder="Material"
          width={200}
        />
        <FormField
          autoCapitalize="characters"
          autoCorrect={false}
          icon="sitemap"
          name="lote"
          placeholder="Lote"
        />
        <FormField
          autoCorrect={false}
          icon="calendar"
          name="dtPreparacao"
          placeholder="Data da preparação"
          width={250}
        />
        <ListItemSeparator />
        <FormField
          editable={false}
          icon="account-check"
          name="projeto"
          width={200}
        />
        <ListItemSeparator />
        <SubmitButton title="Inserir" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddDocumentScreen;
