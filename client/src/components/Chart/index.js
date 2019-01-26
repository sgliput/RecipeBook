import React, { Component } from "react";
import API from "../../utils/API";
import "./chart.css";


var Chart = require("chart.js");

class TagChart extends Component {
    state = {

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.show !== prevProps.show) {
            console.log(this.state.recipeData);
            if (this.props.show === "block") {
                //Function for rendering pie chart
                API.getTagProportions()
                .then(res => {
                    console.log(res.data);

                    var ctx = document.getElementById("myChart").getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: ["Asian", "Appetizer", "Baked Goods", "BBQ", "Beans", "Beef", "Bread", "Breakfast", "Brunch", "Cake", "Casserole", "Chicken", "Cookie", "Corn", "Dessert", "Drinks", "Eggs", "Fish", "Fruit", "Gluten-Free", "Holiday", "Lamb", "Meat", "Mediterranean", "Mexican", "Pasta", "Pastry", "Pizza", "Pork", "Potato", "Poultry", "Rice", "Salad", "Sandwich", "Seafood", "Side Dish", "Soup", "Vegan", "Vegetarian"],
                            datasets: [{
                                label: '% of Tags',
                                data: res.data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.8)',
                                    'rgba(54, 162, 235, 0.8)',
                                    'rgba(255, 206, 86, 0.8)',
                                    'rgba(75, 192, 192, 0.8)',
                                    'rgba(153, 102, 255, 0.8)',
                                    'rgba(255, 159, 64, 0.8)',

                                    'rgba(155, 99, 12, 0.8)',
                                    'rgba(100, 22, 235, 0.8)',
                                    'rgba(225, 206, 140, 0.8)',
                                    'rgba(115, 72, 192, 0.8)',
                                    'rgba(233, 10, 155, 0.8)',
                                    'rgba(245, 89, 104, 0.8)',

                                    'rgba(225, 99, 232, 0.8)',
                                    'rgba(154, 192, 35, 0.8)',
                                    'rgba(85, 200, 186, 0.8)',
                                    'rgba(175, 162, 92, 0.8)',
                                    'rgba(83, 109, 155, 0.8)',
                                    'rgba(0, 0, 0, 0.8)',

                                    'rgba(215, 199, 32, 0.8)',
                                    'rgba(154, 22, 235, 0.8)',
                                    'rgba(55, 88, 111, 0.8)',
                                    'rgba(205, 132, 102, 0.8)',
                                    'rgba(223, 142, 155, 0.8)',
                                    'rgba(195, 139, 4, 0.8)',

                                    'rgba(245, 199, 62, 0.8)',
                                    'rgba(24, 192, 205, 0.8)',
                                    'rgba(75, 80, 166, 0.8)',
                                    'rgba(190, 252, 92, 0.8)',
                                    'rgba(43, 107, 155, 0.8)',
                                    'rgba(175, 107, 100, 0.8)',

                                    'rgba(215, 169, 32, 0.8)',
                                    'rgba(254, 62, 135, 0.8)',
                                    'rgba(57, 200, 186, 0.8)',
                                    'rgba(35, 92, 240, 0.8)',
                                    'rgba(103, 202, 155, 0.8)',
                                    'rgba(255, 123, 144, 0.8)',

                                    'rgba(5, 83, 132, 0.8)',
                                    'rgba(234, 182, 65, 0.8)',
                                    'rgba(245, 106, 126, 0.8)',

                                    // 'rgba(76, 222, 42, 0.8)',
                                    // 'rgba(183, 202, 255, 0.8)',
                                    // 'rgba(255, 19, 94, 0.8)',

                                    // 'rgba(252, 189, 22, 0.8)',
                                    // 'rgba(104, 162, 135, 0.8)',
                                    // 'rgba(255, 77, 86, 0.8)',
                                    // 'rgba(75, 192, 192, 0.8)',
                                    // 'rgba(153, 102, 255, 0.8)'

                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',

                                    'rgba(155, 99, 12, 1)',
                                    'rgba(100, 22, 235, 1)',
                                    'rgba(225, 206, 140, 1)',
                                    'rgba(115, 72, 192, 1)',
                                    'rgba(233, 10, 155, 1)',
                                    'rgba(245, 89, 104, 1)',

                                    'rgba(225, 99, 232, 1)',
                                    'rgba(154, 192, 35, 1)',
                                    'rgba(85, 200, 186, 1)',
                                    'rgba(175, 162, 92, 1)',
                                    'rgba(83, 109, 155, 1)',
                                    'rgba(0, 0, 0, 1)',

                                    'rgba(215, 199, 32, 1)',
                                    'rgba(154, 22, 235, 1)',
                                    'rgba(55, 88, 111, 1)',
                                    'rgba(205, 132, 102, 1)',
                                    'rgba(223, 142, 155, 1)',
                                    'rgba(195, 139, 4, 1)',

                                    'rgba(245, 199, 62, 1)',
                                    'rgba(24, 192, 205, 1)',
                                    'rgba(75, 80, 166, 1)',
                                    'rgba(190, 252, 92, 1)',
                                    'rgba(43, 107, 155, 1)',
                                    'rgba(175, 107, 100, 1)',

                                    'rgba(215, 169, 32, 1)',
                                    'rgba(254, 62, 135, 1)',
                                    'rgba(57, 200, 186, 1)',
                                    'rgba(35, 92, 240, 1)',
                                    'rgba(103, 202, 155, 1)',
                                    'rgba(255, 123, 144, 1)',

                                    'rgba(5, 83, 132, 1)',
                                    'rgba(234, 182, 65, 1)',
                                    'rgba(245, 106, 126, 1)',
                                ],
                                borderWidth: 0.2
                            }]
                        },
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                position: "top",
                                text: "Take a look at which tags are most popular!",
                                fontSize: 18,
                                fontColor: "#111"
                            },
                            legend: {
                                display: true,
                                position: "bottom",
                                labels: {
                                    fontColor: "#333",
                                    fontSize: 14
                                }
                            }
                        }
                    })
                });
            }

        }
    }
        
        render() {
            return (
                <div>
                    <canvas id="myChart" width="400" height="450"></canvas>
                </div >
            );
        }
    }




    export default TagChart;