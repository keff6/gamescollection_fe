import { useContext } from 'react';
import proptypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { AppState } from "../../Config/store/state";
import Spinner from "../../Common/Spinner/Spinner.component";
import classes from './Brands.module.css';

const BrandsTable = ({ brands, deleteBrand, editBrand }) => {
  const { isLoading } = useContext(AppState);

  if(isLoading) return <Spinner />

  return (
    <>
      {(brands.length > 0) &&
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Origin</th>
            <th>Logo URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {brands.map(brand => (
            <tr key={brand.id}>
              <td>{brand.name}</td>
              <td>{brand.origin}</td>
              <td>{brand.logourl}</td>
              <td>
                <div className={classes.tableButtonsContainer}>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => editBrand(brand)}
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteBrand(brand)}
                  >
                    <Trash />
                  </Button>
                </div>
              </td>
            </tr>
            )
          )}
        </tbody>
      </Table>}
      {(brands.length === 0) && <h3>Start adding brands</h3>}
    </>
  )
}

BrandsTable.propTypes = {
  deleteBrand: proptypes.func,
  editBrand: proptypes.func,
  brands: proptypes.array,
}

export default BrandsTable;