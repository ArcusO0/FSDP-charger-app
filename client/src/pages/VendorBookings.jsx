import React, {useState, useEffect} from 'react';
import { PropTypes } from 'prop-types';
import {ThemeProvider, createTheme, useTheme, Box, Container, Card, Typography,
Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper, 
TablePagination, TableFooter, TableSortLabel, IconButton, Dialog} from '@mui/material';
import {FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight, Close} from "@mui/icons-material";
import Sidebar from '../components/sidebar';
import http from "../http";
import CanvasJSReact from "@canvasjs/react-charts";

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

// Table Header with Sorting Icon

function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return(
    <TableHead>
      <TableRow>
        <TableCell 
        key={"bookingId"}
        align={'left'}
        padding={"none"}
        sortDirection={orderBy === "bookingId" ? order : false}>
          <TableSortLabel
          active={orderBy === "bookingId"}
          direction={orderBy === "bookingId" ? order: "asc"}
          onClick={createSortHandler("bookingId")}>
            Booking ID
          </TableSortLabel>
        </TableCell>
        <TableCell
        key={"customerId"}
        align={'left'}
        padding={"none"}
        sortDirection={orderBy === "customerId" ? order : false}>
          <TableSortLabel
          active={orderBy === "customerId"}
          direction={orderBy === "customerId" ? order: "asc"}
          onClick={createSortHandler("customerId")}>
            Customer ID
          </TableSortLabel>
        </TableCell>
        <TableCell
        key={"evcId"}
        align={'left'}
        padding={"none"}
        sortDirection={orderBy === "evcId" ? order : false}>
          <TableSortLabel
          active={orderBy === "evcId"}
          direction={orderBy === "evcId" ? order: "asc"}
          onClick={createSortHandler("evcId")}>
            EV Charger ID
          </TableSortLabel>
        </TableCell>
        <TableCell
        key={"createdAt"}
        align={'left'}
        padding={"none"}
        sortDirection={orderBy === "createdAt" ? order : false}>
          <TableSortLabel
          active={orderBy === "createdAt"}
          direction={orderBy === "createdAt" ? order: "asc"}
          onClick={createSortHandler("createdAt")}>
            Booking Date
          </TableSortLabel>
        </TableCell>
        <TableCell
        key={"bookingPrice"}
        align={'left'}
        padding={"normal"}
        sortDirection={orderBy === "bookingPrice" ? order : false}>
          <TableSortLabel
          active={orderBy === "bookingPrice"}
          direction={orderBy === "bookingPrice" ? order: "asc"}
          onClick={createSortHandler("bookingPrice")}>
            Booking Price
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,

}



// Main Page for Bookings

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
      res.data.bookingPrice = parseFloat(res.data.bookingPrice);
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

  // Sorting Table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("bookingId");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order ==="asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property)
  }

  function descendingComparator(a, b, orderBy) {
    if (orderBy != "bookingPrice") {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    }
    else {
      const valB = parseFloat(b[orderBy]);
      const valA = parseFloat(a[orderBy]);
      if (valB < valA) {
        return -1;
      }
      if (valB > valA) {
        return 1;
      }
    }
    return 0;
  } 

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a,b) => descendingComparator(a, b, orderBy)
      : (a,b) => -descendingComparator(a, b, orderBy);
  }

  function sortData(array, comparator) {
    const stabilisedThis = array.map((el, index) => [el, index]);
    stabilisedThis.sort((a,b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilisedThis.map((el) => el[0])
  } 


  // Graph (Canvas JS)
  function generateBookingData() {
    var dataList = []
    var dataDict = {};
    for (var i in bookingList) {
      const bookingDate = bookingList[i].createdAt;
      const numBook = bookingList.filter((booking) => booking.createdAt == bookingDate).length
      dataDict[bookingDate] = numBook
    }
    for (var i in dataDict) {
      dataList.push({ y: dataDict[i], label: new Date(i).toDateString().slice(4)});
    }
    return dataList
  };

  function generateBookingChart() {
    var dataList = generateBookingData();
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Number of Bookings / Day"
      },
      axisY: {
        title: "Number of Bookings",
        minimum: 0,
        increment: 5,
      },
      axisX: {
        title: "Day",
        labelFontSize: 15
      },
      data: [
        {
          type: "line",
          toolTipContent: "{label}: ${y}",
          dataPoints: dataList
        }
      ]
    }
    return (
      <CanvasJSChart options = {options}/>
    )
  }
  const bookingChart = generateBookingChart();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // Add Filtering for each column (Booking Date, Booking Price)
    <ThemeProvider theme={theme}>
      <Container>
        {sidebar}
        <Card sx={{textAlign:"center", mt: 3, bgcolor:"#9BB1C3"}} onClick={handleOpen}>
          <Typography variant="h3" sx={{pt: 10, fontWeight: "bold"}}>
            {count}
          </Typography>
          <Typography variant="h3" sx={{pb: 10, fontWeight: "bold"}}>
            Bookings
          </Typography>
        </Card>
        <Dialog 
            fullScreen
            open={open}
            onClose={handleClose}
            >
              <Box sx={{p:4}}>
                <IconButton onClick={handleClose}>
                  <Close/>
                </IconButton>
                {bookingChart}
                <Typography sx={{mt: 3, ml: 1}}>
                  Some Regression Information
                </Typography>
              </Box>
            </Dialog>
        <TableContainer component={Paper} sx={{mt: 2, mb: 2, boxShadow:"none"}}>
          <Table stickyHeader aria-label='simple table'>
            <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            />
            <TableBody>
              {(rowsPerPage > 0
              ? sortData(bookingList,getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
