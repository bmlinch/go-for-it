angular.module('con4', [])
	.controller('GameController', function($scope){
		
		$scope.newGame = function(){
			/**
			 * set victory to false DONE
			 * $scope.grid = buildGrid(); DONE
			 * This is connect 4 so red plays first
			 */
            $scope.activePlayer = 'red'
               var victory = false
               $scope.grid = buildGrid();
		}
		
		function buildGrid(){
			//Build a 6x7 grid object and return it from this function DONE
			//Each cell of the grid is an object that knows its coords DONE
            var grid = []
            for (var row = 0; row < 6; row++){
                grid[row] = []
                for(var col = 0; col < 7; col++){
                    grid[row].push({row: row, col: col})
                }              
            }
            return grid;
			/**
			 * Cell Schema
			 * {
			 * 		row: number,
			 * 		col: number
			 * }
			 */		
			//Once you finishe building your grid make sure $scope.newGame is setting 
			//$scope.grid = buildGrid();
			//If your build grid is working correctly you can start up your server to see the grid
			//drawn to the screen.
		}
		
		$scope.dropToken = function(col){
			//The col is passed in from the view
			//Column is full no space available
			//Bad Drop
			if($scope.grid[0][col].hasToken){
				return;
			}
			
			//Find the southMost unoccupied row
			/**
			 * Always start at row 0 and then increment
			 * until you have reached the final row or 
			 * found a cell that already has a token
			 */
			var row = checkSouth(0, col);

			/**
			 * Once the row is identified DONE
			 * set the cell by accessing  DONE
			 * $scope.grid[row][col]      DONE
			 * set cell.hasToken = true   DONE
			 * set cell.color $scope.activePlayer Done
			 **/  
			var cell = $scope.grid[row][col]
            
            cell.hasToken = true
            cell.color = $scope.activePlayer
			//endTurn and checkVictory
            endTurn()
            checkVictory(cell)
            
        
		}
		
		function checkSouth(row, col){
		/**
		 * Let's use recursion
		 * A recursive function is...
		 * a function that calls itself
		 * until some condition is met
		 * 
		 * Check South will need essentially two base cases
		 * 
		 */
            if($scope.grid[row][col].hasToken) {return row - 1}
			//Base case 1 found south Token return row - 1 to go back one step
			
			//base case 2 reached bottom of grid return row or 5
			if(row >= 5){return 5}
            row++
            return checkSouth(row, col)
			/**
			 * if neither base case 
			 * (***increment row***, then return checkSouth())
			 * make sure to pass the arguments through
			 */
		}
		
		function checkVictory(cell){
			//This one is a gimme you shouldn't have to change anything here
			//Once you fix the checkNextCell function the green squiggles should dissapear.
			//If they don't make sure you are returning a number from the checkNextCell function
			
			var horizontalMatches = 0;
			//Check Horizontal
			horizontalMatches += checkNextCell(cell, 0, 'left');
			horizontalMatches += checkNextCell(cell, 0, 'right');
			
			//Check Vertical
			var verticalMatches = 0;
           
			verticalMatches += checkNextCell(cell, 0, 'bottom');
			
			//Check DiagLeftUp and RightDown
			var diagLeft = 0;
			diagLeft += checkNextCell(cell, 0, 'diagUpLeft');
			diagLeft += checkNextCell(cell, 0, 'diagBotRight');
			
			//Check DiagRigthUp and LeftDown
			var diagRight = 0;
			diagRight += checkNextCell(cell, 0, 'diagUpRight');
			diagRight += checkNextCell(cell, 0, 'diagBotLeft');
			
          
            
            
            console.log(verticalMatches, horizontalMatches, diagLeft, diagRight)
			if(verticalMatches >= 3 || horizontalMatches >= 3 || diagLeft >= 3 || diagRight >= 3){
				//You can do better than an alert 
				
                victory = true;
                if(victory){
                    alert('yes!');
                }
			}
		}
		
		function getNextCell(cell, direction){
			/**
			 * var nextRow = cell.row;
			 * var nextCol = cell.col;
			 * 
			 * adjust the values of nextRow
			 * and nextCol as needed based upon
			 * the direction of travel.
			 * 
			 * if nextRow > 0 or < 5 
			 * or if nextCol > 6 
			 * return null;
			 * 
			 * otherwise 
			 * return $scope.grid[nextRow][nextCol];
             * 
			 */
            var nextRow = cell.row
            var nextCol = cell.col
            
            switch(direction){
                case 'left':
                nextCol--;
                break;
                case 'right':
                nextCol++;
                break;
                case 'bottom':
                nextRow++;
                break;
                case 'diagUpLeft':
                nextRow--;
                nextCol--;
                break;
                case 'diagBotRight':
                nextRow++;
                nextCol++;
                break;
                case 'diagUpRight':
                nextRow--;
                nextCol++;
                break;
                case 'diagBotLeft':
                nextRow++;
                nextCol--;
                break;
                
            }
            
            
            
            
            if(nextRow < 0 || nextRow > 5 || nextCol > 6 || nextCol < 0){
                return null;
            } else {
                return $scope.grid[nextRow][nextCol]
            }
		}
		
		function checkNextCell(cell, matches, direction){
			/**
			 * var nextCell = getNextCell(cell, direction)
			 * check if nextCell is defined 
			 * if nextCell.hasToken and nextCell.color
			 * matches cell.color 
			 * increment matches and then 
			 * return checkNextCell(nextCell, matches, direction)
			 * 
			 * otherwise return matches
			 */
            var nextCell = getNextCell(cell, direction)
                if(nextCell){
                    if(nextCell.hasToken && nextCell.color === cell.color){
                        matches++
                        return checkNextCell(nextCell, matches, direction)
                    }
                } 
                    return matches;
                
            
           
		}
		
		function endTurn(){
			/**
			 * End Turn simply switch DONE
             
			 * $scope.activePlayer from DONE
			 * 'red' to 'yellow' DONE
			 * and 'yellow' to 'red' DONE
			 */
            if($scope.activePlayer === 'red'){
                $scope.activePlayer = 'yellow'
            } else{
                $scope.activePlayer = 'red'
            }
		}
	});