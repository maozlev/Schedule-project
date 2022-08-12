import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { IconBrightness_1 } from '@aws-amplify/ui-react';
import "./Guide-table.css"
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTables(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 1150, margin: 'auto'}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>מס'</StyledTableCell>
            <StyledTableCell>בית חולים / מוסד</StyledTableCell>
            <StyledTableCell>מחלקה</StyledTableCell>
            <StyledTableCell>כתובת</StyledTableCell>
            <StyledTableCell>איש קשר</StyledTableCell>
            <StyledTableCell>מס' פלאפון</StyledTableCell>
            <StyledTableCell>דואר אלקטורני</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.contactsArray.map((contact, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell component="th" scope="row">
                {idx+1}
              </StyledTableCell>
              <StyledTableCell>{contact.Hospital}</StyledTableCell>
              <StyledTableCell>{contact.Department}</StyledTableCell>
              <StyledTableCell>{contact.Address}</StyledTableCell>
              <StyledTableCell>{contact.Contact}</StyledTableCell>
              <StyledTableCell>{contact.PhoneNumber}</StyledTableCell>
              <StyledTableCell>{contact.Email}</StyledTableCell>
                </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
