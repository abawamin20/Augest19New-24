import * as React from "react";
import { useState, useEffect } from "react";
import { TextField, PrimaryButton } from "@fluentui/react";
import PagesService from "../PagesList/PagesService";

export interface IListFormProps {
  pageService: PagesService;
  articleId: string; // Passed from parent component
  title: string; // Passed from parent component
  name: string; // Passed from parent component
  hideDialog: () => void;
}

const ListForm: React.FunctionComponent<IListFormProps> = (props) => {
  const [feedbackComments, setFeedbackComments] = useState<string>("");

  const handleSubmit = async () => {
    const formData = {
      Article_x0020_ID: props.articleId,
      Title: props.title,
      Name: props.name,
      FeedBackComments: feedbackComments,
    };

    try {
      await props.pageService.createListItem(formData, "Feedbacks");
      alert("Feedback created successfully!");
      props.hideDialog();
    } catch (error) {
      console.error("Error creating list item: ", error);
      alert("Failed to create item.");
    }
  };

  useEffect(() => {
    // This useEffect can be used if you want to perform any action when articleId, title, or name change.
    // Or if you'd like to set additional logic based on the selected values.
  }, [props.articleId, props.title, props.name]);

  return (
    <div>
      <h2>Submit Feedback</h2>

      <TextField
        label="Article Id"
        type="number"
        value={props.articleId}
        readOnly
        style={{
          marginBottom: "10px",
        }}
      />

      <TextField
        label="Title"
        type="text"
        value={props.title}
        readOnly
        style={{
          marginBottom: "10px",
        }}
      />

      <TextField
        label="Name"
        type="text"
        value={props.name}
        readOnly
        style={{
          marginBottom: "10px",
        }}
      />

      <TextField
        label="Feedback Comments"
        multiline
        rows={4}
        value={feedbackComments}
        onChange={(_, value) => setFeedbackComments(value || "")}
        style={{
          marginBottom: "10px",
        }}
      />

      <PrimaryButton
        style={{
          marginTop: "10px",
        }}
        text="Submit Feedback"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default ListForm;
