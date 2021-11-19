import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'

import RecordDetails from './RecordDetails'
import RecordDialog from './RecordDialog'
import { getRecordsFromAPI, getRecordsFromJSON } from '../store/actions/record';
import { getRecordTypes } from '../store/actions/recordType';
import recordService from '../services/recordService';

const TRANSFORMATIONS = [
  { label: 'Decrypted', value: 'decrypt' },
  { label: 'Encrypted', value: 'encrypt' },
  { label: 'Anonymized', value: 'anonymize' },
  { label: 'Redacted', value: 'redact' },
];

function Records() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);
  const [transformation, setTransformation] = useState('decrypt');

  const dispatch = useDispatch();
  const { records: containerRecords } = useSelector(state => state.record);
  const { recordTypes } = useSelector(state => state.recordType);

  const fetchRecords = useCallback(async () => {
    const recordIds = containerRecords.map(({ guid }) => guid);

    if (recordIds.length === 0) return;

    const response = await recordService.getWithDecryptBulkRecord(recordIds, {});
    setRecords(Object.values(response));
  }, [containerRecords]);

  useEffect(() => {
    if (!selected && records.length > 0) {
      setSelected(records[0].guid);
    }
  }, [records]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  useEffect(() => {
    (async () => {
      await dispatch(getRecordsFromAPI('aaaaaaaa-a9eb-4425-b356-5f7976b5defb'));
      await dispatch(getRecordTypes());
    })();
  }, []);

  const handleShow = () => setOpen(true);

  const handleClose = () => setOpen(false);

  if (!records.length)
    return (<p>Loading data</p>)

  return (
    <div style={{ marginTop: 16 }}>
      <div className="col-md-3" style={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        {records.map(record => (
          <Panel bsStyle="info" key={record.guid} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{record.guid}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>{record.guid}</p>
              <p>{recordTypes.find((recordType) => recordType.id === record.record_type_id).name}</p>
              <p>Tags : {record?.tags?.map(({ tag }) => tag).join(', ')}</p>
              <Button bsStyle="info" onClick={() => setSelected(record.guid)}>
                Click to View Details
              </Button>
            </Panel.Body>
          </Panel>
        ))}
      </div>
      <div className="col-md-6">
        <RecordDetails val={selected} transformation={transformation} />
      </div>
      <div className="col-md-3">
        <FormGroup
          controlId="formControlsSelect"
          value={transformation}
          onChange={(event) => setTransformation(event.target.value)}
        >
          <ControlLabel>TransFormation</ControlLabel>
          <FormControl componentClass="select" placeholder="Transformation">
            {TRANSFORMATIONS.map((trans) => (
              <option value={trans.value}>{trans.label}</option>
            ))}
          </FormControl>
        </FormGroup>
        <Button bsStyle="info" onClick={handleShow}>Create Record</Button>
      </div>
      {open && (
        <RecordDialog open={open} guid={null} onClose={handleClose} />
      )}
    </div>
  )
}

export default Records;
