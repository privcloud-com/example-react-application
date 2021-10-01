import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'

import RecordDetails from './RecordDetails'
import RecordDialog from './RecordDialog'
import { getRecordsFromAPI, getRecordsFromJSON } from '../store/actions/record';
import { getRecordTypes } from '../store/actions/recordType';
import recordService from '../services/recordService';

function Records() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState([]);

  const { type } = useParams();
  const dispatch = useDispatch();
  const { records: containerRecords } = useSelector(state => state.record);
  const { recordTypes } = useSelector(state => state.recordType);

  const fetchContainerRecords = useCallback(async () => {
    if (type === 'privcloud') {
      dispatch(getRecordsFromAPI('aaaaaaaa-a9eb-4425-b356-5f7976b5defb'));
    } else {
      dispatch(getRecordsFromJSON());
    }
  }, [type]);

  const fetchRecords = useCallback(async () => {
    const recordIds = containerRecords.map(({ guid }) => guid);

    if (recordIds.length === 0) return;

    const response = await recordService.getWithBulkRecord(recordIds, {});
    setRecords(Object.values(response));
  }, [containerRecords]);

  useEffect(() => {
    if (!selected && records.length > 0) {
      setSelected(records[0].guid);
    }
  }, [records]);

  useEffect(() => {
    fetchContainerRecords();
  }, [fetchContainerRecords]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  useEffect(() => {
    (async () => {
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
              <p>{record.tags.map(({ tag }) => tag).join(', ')}</p>
              <Button bsStyle="info" onClick={() => setSelected(record.guid)}>
                Click to View Details
              </Button>
            </Panel.Body>
          </Panel>
        ))}
      </div>
      <div className="col-md-6">
        <RecordDetails val={selected}/>
      </div>
      <div className="col-md-3" onClick={handleShow}>
        <Button bsStyle="info">Create Record</Button>
      </div>
      {open && (
        <RecordDialog open={open} guid={null} onClose={handleClose} />
      )}
    </div>
  )
}

export default Records;
