import React, {useState, useEffect} from 'react';
import { PropTypes } from 'prop-types';
import {ThemeProvider, createTheme, useTheme, Box, Container, Card, Typography,
Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper, 
TablePagination, TableFooter, IconButton} from '@mui/material';
import {FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import Sidebar from '../components/sidebar';
import http from "../http";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function ConvertDateString(str) {
  if (str == null) {
    return "No Date Recorded";
  }
  const DateObj = new Date(str);
  const displayDate = DateObj.toDateString().slice(4);
  return displayDate;
}


function MyBookings() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
    },
    
  });

  const sidebar = Sidebar();

  const [bookingList, setBookingList] = useState([]);
  
  useEffect(() => {
    http.get("/MyBookings").then((res) => {
      console.log(res.data);
      setBookingList(res.data);
    });
  }, []);

  const count = bookingList.length;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookingList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    // Add Filtering for each column (Booking Date, Booking Price)
    <ThemeProvider theme={theme}>
      <Container>
        {sidebar}
        <Card sx={{textAlign:"center", mt: 3, bgcolor:"#9BB1C3"}}>
          <Typography variant="h3" sx={{pt: 10, fontWeight: "bold"}}>
            {count}
          </Typography>
          <Typography variant="h3" sx={{pb: 10, fontWeight: "bold"}}>
            Bookings
          </Typography>
        </Card>
        <TableContainer component={Paper} sx={{mt: 2, mb: 2, boxShadow:"none"}}>
          <Table stickyHeader aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>EV Charger ID</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Booking Price ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
              ? bookingList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : bookingList
              ).map((booking)=> (
                <TableRow key={booking.id}>
                  <TableCell>{booking.bookingId}</TableCell>
                  <TableCell>{booking.customerId}</TableCell>
                  <TableCell>{booking.evcId}</TableCell>
                  <TableCell>{ConvertDateString(booking.createdAt)}</TableCell>
                  <TableCell>{booking.bookingPrice}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
                <TableRow>
                  <TablePagination 
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={5}
                  count={bookingList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  )
}

export default MyBookings