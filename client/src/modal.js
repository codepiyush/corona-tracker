import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function Modal({ name }) {


    const countryData = gql`
    query CountryData($name: String!){
        single(name:$name){
            country
            cases {
              new
              active
              critical
              recovered
              total
            }
            deaths {
              new
              total
            }
            tests {
              total
            }
          }
    }
    `

    useEffect(() => {
        console.log(typeof name)
        window.onclick = function (event) {
            var modal = document.getElementsByClassName('modal')[0]
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });

    const { loading, error, data } = useQuery(countryData, {variables: {name}});
    if (loading) {
        return (
            <div className="modal">
                <div class="lds-facebook"><div></div><div></div><div></div></div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="modal">
                <div className="modal-inner">
                    Loading ...
                </div>
            </div>
        )
    }
    console.log(data)
    return (
        <div className="modal">
            <div className="modal-inner">
                {/* <div className="cross">X</div> */}
                <div className="modal-title">
                    <p>{data.single.country}</p>
                </div>
                <table className="modal-table">
                    <tr>
                        <td>Total cases</td>
                        <td>{data.single.cases.total}</td>
                    </tr>
                    <tr className="red">
                        <td>New cases</td>
                        <td >{data.single.cases.new}</td>
                    </tr>
                    <tr>
                        <td>Active cases</td>
                        <td>{data.single.cases.active}</td>
                    </tr>
                    <tr className="green">
                        <td >Recovered</td>
                        <td >{data.single.cases.recovered===0?"N/A":data.single.cases.recovered}</td>
                    </tr>
                    <tr>

                        <td>Total deaths</td>
                        <td>{data.single.deaths.total}</td>
                    </tr>
                    <tr className="red">
                        <td>New deaths</td>
                        <td >{data.single.deaths.new}</td>
                    </tr>
                    <tr>
                        <td>Total tests</td>
                        <td>{!data.single.tests.total?"N/A":data.single.tests.total}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Modal;