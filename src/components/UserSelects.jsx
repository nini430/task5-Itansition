import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import RangeSlider from "react-bootstrap-range-slider";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineDownload } from "react-icons/ai";
import jsonToCsv from "json2csv";

import countries from "../countries.json";
import { makeData } from "../makeData";
import { useData } from "../context/dataContext";

const UserSelects = () => {
  const [csvData, setCsvData] = useState("");
  let {
    seed,
    setSeed,
    selected,
    setSelected,
    data,
    setData,
    value,
    setValue,
    pageNumber,
    setPageNumber,
    sliceIndex,
  } = useData();
  const [errors, setErrors] = useState({});

  const stepDetermination = () => {
    let step;
    if (value > 1) {
      step = 1;
    } else {
      step = 0.5;
    }

    return step;
  };

  const reset = (e) => {
    e.preventDefault();
    setValue(0);
    setSeed(175698);
  };

  useEffect(() => {
    if (data.length) {
      console.log(sliceIndex);
      setCsvData(jsonToCsv.parse(data.slice(0, sliceIndex)));
    }
  }, [data, sliceIndex]);

  useEffect(() => {
    if (selected.length && selected.length < 3) {
      setErrors((prev) => ({
        ...prev,
        countries: "Please select at least 3 country",
      }));
    } else {
      setErrors((prev) => ({ ...prev, countries: null }));
    }

    if (value > 1000) {
      setErrors((prev) => ({
        ...prev,
        errors: "erors per record should not exceed 1000",
      }));
    } else {
      setErrors((prev) => ({ ...prev, errors: null }));
    }

    if (selected.length && selected.length >= 3 && value <= 1000) {
      console.log("au aqac");
      const data = makeData(seed, selected, value, 0, 1000);
      setData(data);
    }
  }, [selected, value]);

  useEffect(() => {
    if (pageNumber) {
      const modified = makeData(
        seed,
        selected,
        value,
        (pageNumber - 1) * 20,
        (pageNumber - 1) * 20 + 20
      );
      console.log(modified);
      const dataRef = data.slice(0);
      dataRef.splice((pageNumber - 1) * 20, 20, ...modified);
      setData(dataRef);
    }
  }, [seed]);

  return (
    <Form>
      <Form.Group className="mb-2">
        <Form.Label>Select regions (at least 3 different)</Form.Label>
        <Typeahead
          isInvalid={!!errors.countries}
          id="countries"
          options={countries.map((country) => country.name)}
          selected={selected}
          onChange={setSelected}
          multiple
        />
        {errors.countries && <p className="error">{errors.countries}</p>}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Specify Number of errors (per record)</Form.Label>
        <Form.Control
          isInvalid={!!errors.errors}
          max={1000}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <RangeSlider
          min={0}
          max={10}
          step={stepDetermination()}
          tooltip="auto"
          tooltipPlacement="top"
          value={Math.min(value, 10)}
          onChange={(e) => setValue(e.target.value)}
        />
        {errors.errors && <p className="error">{errors.errors}</p>}
      </Form.Group>
      <Form.Group className="seed mb-2">
        <Form.Text>click to generate your own random seed</Form.Text>
        <Button
          disabled={!pageNumber}
          onClick={() => setSeed(Math.floor(100000 + Math.random() * 900000))}
        >
          Seed({seed})
        </Button>
        <Form.Control
          isInvalid={errors.pageNum}
          value={pageNumber}
          onChange={(e) => setPageNumber(+e.target.value)}
          placeholder="page"
          type="number"
          min="1"
          max="50"
        />
        {errors.pageNum && <p className="error">{errors.pageNum}</p>}
      </Form.Group>
      <Button className="reset" variant="secondary" onClick={reset}>
        <GrPowerReset stroke="#fff" /> Reset
      </Button>
      {data.length ? (
        <a
          href={`data:text/csv;charset=utf-8,${csvData}`}
          download={`data.csv`}
        >
          <Button disabled={!data.length} variant="link">
            <AiOutlineDownload /> Download to CSV
          </Button>{" "}
        </a>
      ) : (
        ""
      )}
    </Form>
  );
};

export default UserSelects;
