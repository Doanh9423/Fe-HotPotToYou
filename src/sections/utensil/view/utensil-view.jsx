import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import utensilApi from '../../../api/utensilAPI';
import TableEmptyRows from '../table-empty-rows';
import UtensilTableRow from '../utensil-table-row';
import UtensilTableHead from '../utensil-table-head';
import UtensilTableToolbar from '../utensil-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UtensilPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dataUtensil, setDataUtensil] = useState([]);

  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchListUtensil = async (pageIndex, pageSize) => {
    try {
      // setLoading(true);
      const response = await utensilApi.getAll({ pageIndex: 1, pageSize: 5 });
      console.log('dataTBL', response.value);
      setDataUtensil(response?.value);
    } catch (error) {
      console.log('err', error);
      setDataUtensil([]);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Load Data failed !');
      }
    }
    //  finally {
    //    setLoading(false);
    // }
  };
  useEffect(() => {
    fetchListUtensil();
  }, [page, rowsPerPage]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataUtensil.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: dataUtensil,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Utensils</Typography>

        {/* <Modal
          title="Thêm lẩu"
          open={openModal}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
          width={1000}
          style={{ top: 20 }}
          footer={null}
        >
          <Form form={createForm} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Size" name="size" rules={[{ required: true, message: 'Please input your size!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Image" name="imageUrl" rules={[{ required: true, message: 'Please input your imageUrl!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input your price!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Type" name="typeID" rules={[{ required: true, message: 'Please input your typeID!' }]}>
              <Select placeholder="Type" allowClear>
                {types?.map((cl) => (
                  <Select.Option key={cl?.id} value={cl?.id}>
                    {cl?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}
      </Stack>

      <Card>
        <UtensilTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UtensilTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataUtensil.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'material', label: 'Material' },
                  { id: 'size', label: 'Size' },
                  { id: 'quantity', label: 'Quantity' },
                  { id: 'price', label: 'Price' },
                  { id: 'type', label: 'Type' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataUtensil.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <UtensilTableRow
                    name={item.name}
                    material={item.material}
                    size={item.size}
                    quantity={item.quantity}
                    price={item.price}
                    type={item.price}
                    selected={selected.indexOf(item.name) !== -1}
                    handleClick={(event) => handleClick(event, item.name)}
                  />
                ))}
                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, dataUtensil.length)} />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataUtensil.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// const [utensils, setUtensils] = useState([]);

// const fetchUtensils = async (pageIndex, pageSize) => {
//   try {
//     const response = await axiosClient.get('/utensil', {
//       params: { pageIndex, pageSize },
//     });
//     return response.value;
//   } catch (error) {
//     console.error('Error fetching utensils:', error);
//     return [];
//   }
// };

// useEffect(() => {
//   const getUtensils = async () => {
//     const allUtensils = await fetchUtensils(1, rowsPerPage);
//     if (allUtensils) setUtensils(allUtensils);
//   };
//   getUtensils();
// }, [page, rowsPerPage]);
