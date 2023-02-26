import React from "react";
import Button from "@material-ui/core/Button";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import "./form.css";
import { TextField } from "@material-ui/core";
import moment from "moment";
import { endpoint } from "../../Config/config";

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        videoLink: "",
        title: "",
        genre: "",
        contentRating: "",
        releaseDate: "",
        previewImage: "",
      },
      isError: false,
      submitted: false,
      errorMsg: "",
    };
  }

  componentDidMount() {
    if (!ValidatorForm.hasValidationRule("isValidUrl")) {
      ValidatorForm.addValidationRule("isValidUrl", (value) => {
        let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if (value.match(regex)) {
          return true;
        }
        return false;
      });
    }
  }
  componentWillUnmount() {
    if (ValidatorForm.hasValidationRule("isValidUrl")) {
      ValidatorForm.removeValidationRule("isValidUrl");
    }
  }

  handleChange = (event) => {
    const { formData } = this.state;

    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  };

  handleSubmit = () => {
    this.postVideoAPI(this.state.formData);
  };

  postVideoAPI = async (reqBody) => {
    let response;
    var reqObj = {
      ...reqBody,
      releaseDate: moment(this.state.releaseDate).format("D MMM YYYY"),
    };

    response = await fetch(`${endpoint}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(reqObj), // body data type must match "Content-Type" header
    });

    if (response.ok) {
      this.setState({ isError: false, errorMsg: "" });
      this.props.refresh();
      this.props.onClose();
    } else {
      response = await response.json();
      this.setState({ isError: true, errorMsg: response.message });
    }
  };

  render() {
    const { formData, submitted } = this.state;
    return (
      <ValidatorForm ref={(r) => (this.form = r)} onSubmit={this.handleSubmit}>
        <TextValidator
          label="Video Link"
          onChange={this.handleChange}
          name="videoLink"
          type="text"
          validators={["required", "isValidUrl"]}
          errorMessages={["This field is required", "Invalid Url"]}
          variant="outlined"
          value={formData.videoLink}
          className="form-element"
          id="upload-btn-video"
        />
        <br />
        <TextValidator
          label="Preview Image"
          onChange={this.handleChange}
          name="previewImage"
          type="text"
          validators={["required", "isValidUrl"]}
          errorMessages={["This field is required", "Invalid Url"]}
          variant="outlined"
          value={formData.previewImage}
          className="form-element"
          id="upload-btn-image"
        />
        <br />
        <TextValidator
          label="Title"
          onChange={this.handleChange}
          name="title"
          type="text"
          validators={["required"]}
          errorMessages={["This field is required"]}
          value={formData.title}
          variant="outlined"
          className="form-element"
          id="upload-btn-title"
        />
        <br />
        <SelectValidator
          label="Select Genre"
          value={formData.genre}
          onChange={this.handleChange}
          helperText="Please select genre"
          name="genre"
          variant="outlined"
          className="select-input form-element"
          validators={["required"]}
          errorMessages={["This field is required"]}
          id="upload-btn-genre"
        >
          {this.props.genres
            .filter((option) => option.value !== "all")
            .map((option) => (
              <MenuItem key={"option"} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </SelectValidator>
        <br />
        <SelectValidator
          label="Content Rating"
          value={formData.contentRating}
          onChange={this.handleChange}
          helperText="Please select Content Rating"
          name="contentRating"
          variant="outlined"
          className="select-input form-element"
          validators={["required"]}
          errorMessages={["This field is required"]}
          id="upload-btn-content-rating"
        >
          {["Anyone", "7+", "12+", "16+", "18+"].map((option) => (
            <MenuItem key={"option"} value={option}>
              {option}
            </MenuItem>
          ))}
        </SelectValidator>
        <br />
        <TextField
          onChange={this.handleChange}
          value={formData.releaseDate}
          variant="outlined"
          id="upload-btn-release-date"
          label="Release Date"
          name="releaseDate"
          type="date"
          defaultValue="2017-05-24"
          className="form-element"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br /> <br />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={submitted}
          style={{ marginRight: "10px" }}
          id="upload-btn-submit"
        >
          Submit
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={submitted}
          onClick={() => this.props.onClose()}
          id="upload-btn-cancel"
        >
          Cancel
        </Button>
        {this.state.isError && (
          <div className="error-msg">
            Something went wrong - {this.state.errorMsg}
          </div>
        )}
      </ValidatorForm>
    );
  }
}
