import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import JSONInput from 'react-json-editor-ajrm/index';
import locale from 'react-json-editor-ajrm/locale/en';

import { createRecord, updateRecord } from '../store/actions/record';
import { schemaToJSON } from '../utils/json';

function RecordDialog({ open, guid, onClose }) {
  const [newRecord, setNewRecord] = useState(null);

  const dispatch = useDispatch();
  const { record } = useSelector(state => state.record);
  const { recordTypes } = useSelector(state => state.recordType);

  useEffect(() => {
    if (guid) {
      setNewRecord({
        record_type_id: record.record_type_id,
        record: record.record,
        workspace_id: record.workspace_id,
        container_guid: record.container_guid,
      });
    } else {
      setNewRecord({
        record_type_id: null,
        record: {},
        workspace_id: record.workspace_id,
        container_guid: record.container_guid,
      });
    }
  }, [guid, record]);

  useEffect(() => {
    if (recordTypes.length > 0 && newRecord && !newRecord?.record_type_id) {
      setNewRecord((oldRecord) => ({
        ...(oldRecord || {}),
        record_type_id: recordTypes[0].id,
        record: schemaToJSON(recordTypes[0].schema),
      }));
    }
  }, [recordTypes, newRecord]);

  const handleChangeRecord = (newValue) => {
    setNewRecord({
      ...newRecord,
      record: newValue.jsObject,
    })
  }

  const handleChangeRecordType = (event) => {
    event.persist();
    setNewRecord((oldRecord) => ({
      ...oldRecord,
      record_type_id: event.target.value,
    }));

    const recordType = recordTypes.find((type) => type.id === +event.target.value);
    if (recordType) {
      setNewRecord((oldRecord) => ({
        ...oldRecord,
        record: schemaToJSON(recordType.schema),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (guid) {
      await dispatch(updateRecord(guid, newRecord));
    } else {
      await dispatch(createRecord(newRecord));
    }
    onClose();
  }

  if (!newRecord) {
    return <p>Loading Data</p>
  }

  return (
    <Modal show={open} onHide={onClose}>
      <Form horizontal onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Record Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {record.guid && (
            <FormGroup className="form-group">
              <ControlLabel>Guid</ControlLabel>
              <FormControl
                name="guid"
                placeholder="Record Guid"
                value={record.guid}
                readOnly
              />
            </FormGroup>
          )}
          <FormGroup controlId="formControlsSelect" value={newRecord.record_type_id} onChange={handleChangeRecordType}>
            <ControlLabel>Record Type</ControlLabel>
            <FormControl componentClass="select" placeholder="Record Type">
              {recordTypes.map((recordType) => (
                <option value={recordType.id}>{recordType.name}</option>
              ))}
            </FormControl>
          </FormGroup>
          {record?.record_type && (
            <FormGroup className="form-group">
              <ControlLabel>
                Record Type
              </ControlLabel>
              <FormControl
                name="record_type"
                placeholder="Record Type"
                value={newRecord.record_type.name}
                readOnly
              />
            </FormGroup>
          )}
          <JSONInput
            placeholder={newRecord.record}
            locale={locale}
            colors={{
              string: '#DAA520', // overrides theme colors with whatever color value you want
            }}
            height="300px"
            width="100%"
            onChange={handleChangeRecord}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button type="submit" variant="primary">
            {guid ? 'Update': 'Save'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RecordDialog
