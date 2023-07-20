import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardActionArea,
  Box,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useBookContext } from "../../contexts/BookContext";
import { ColorModeContext } from "../../contexts/color-mode";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

type FineDetail = {
  id: string;
  book_copy_id: number;
  patron_account_id: number;
  is_returned: boolean;
  fine: number;
  due_date: string;
};

function Home() {
  const [fineDetails, setFineDetails] = useState<FineDetail[]>([]);
  const { mode } = useContext(ColorModeContext);

  const { calculateOverdueFine } = useBookContext();

  useEffect(() => {
    const fetchOverdueFine = async () => {
      try {
        const result = await calculateOverdueFine();
        setFineDetails(result);
      } catch (error) {
        console.error("Error fetching overdue fine:", error);
      }
    };

    fetchOverdueFine();
  }, []);

  const boxBgColor = mode === "light" ? "#F0F0F0" : "#303030";

  return (
    <>
      <div style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Card sx={{ width: "90%" }}>
              <CardActionArea>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ padding: 1, backgroundColor: boxBgColor }}>
                    <LibraryBooksIcon />
                  </Box>
                  <Typography variant="h6">Borrowed Book</Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    67 <ShowChartIcon sx={{ color: "blue" ,margin:1 }} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ width: "90%" }}>
              <CardActionArea>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ padding: 1, backgroundColor: boxBgColor }}>
                    <LibraryBooksIcon />
                  </Box>
                  <Typography variant="h6">New Accounts</Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    33
                    <TrendingDownIcon sx={{ color: "red" , margin:1 }} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ width: "90%" }}>
              <CardActionArea>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ padding: 1, backgroundColor: boxBgColor }}>
                    <LibraryBooksIcon />
                  </Box>
                  <Typography variant="h6">New Stock Update</Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    50 <ShowChartIcon sx={{ color: "blue", margin:1 }} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={8}>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={880}
              height={350}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid xs={8} sx={{ borderRight: 1, padding: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4" sx={{ paddingRight: 8 }}>
                overdue books
              </Typography>
              <Typography variant="subtitle2">see all</Typography>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Book Copy ID</TableCell>
                    <TableCell>Patron Account ID</TableCell>
                    <TableCell>Fine Amount</TableCell>
                    <TableCell>Due Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fineDetails.slice(0, 5).map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>{detail.id}</TableCell>
                      <TableCell>{detail.book_copy_id}</TableCell>
                      <TableCell>{detail.patron_account_id}</TableCell>
                      <TableCell>{detail.fine}</TableCell>
                      <TableCell>{detail.due_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xs={4}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Fiction" },
                    { id: 1, value: 15, label: "Non-Fiction" },
                    { id: 2, value: 20, label: "Literature" },
                  ],
                },
              ]}
              width={350}
              height={250}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;
