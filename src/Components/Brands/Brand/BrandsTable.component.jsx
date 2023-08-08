import { useContext } from 'react';
import proptypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { AppState } from "../../../Config/store/state";
import Spinner from "../../../Common/Spinner/Spinner.component";
import classes from './Brands.module.css';

const BrandsTable = ({ brands, deleteBrand, editBrand }) => {
  const { isLoading } = useContext(AppState);

  if(isLoading) return <Spinner />

  return (
    <>
      {(brands.length > 0) &&
      <Table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.width25}>Name</th>
            <th className={`${classes.width15} d-none d-md-table-cell`}>Origin</th>
            <th className="d-none d-md-table-cell">Logo URL</th>
            <th className={classes.width15}></th>
          </tr>
        </thead>
        <tbody>
          {brands.map(brand => (
            <tr key={brand.id}>
              <td className={classes.textOverflow}>{brand.name}</td>
              <td className="d-none d-md-table-cell">{brand.origin}</td>
              <td className={`${classes.textOverflow} d-none d-md-table-cell`}>{brand.logoUrl}</td>
              <td>
                <div className={classes.tableButtonsContainer}>
                  <Button
                    variant="outline-light"
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
      {(brands.length === 0) && <h3 className="empty-list-text">Start adding brands</h3>}
    </>
  )
}

BrandsTable.propTypes = {
  deleteBrand: proptypes.func,
  editBrand: proptypes.func,
  brands: proptypes.array,
}

export default BrandsTable;