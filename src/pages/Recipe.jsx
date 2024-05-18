import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { useCalories } from '../components/CalorieContext'; // Import the useCalories hook

function Recipe() {
  const [details, setDetails] = useState({});
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, fat: 0 });
  const [activeTab, setActiveTab] = useState('instructions');
  let params = useParams();
  const { addCalories, addProtein, addFat } = useCalories(); // Use the addCalories function from context

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const dataDetail = await data.json();
    setDetails(dataDetail);

    // Extract nutritional information from the summary
    const summary = dataDetail.summary;
    const calorieMatch = summary.match(/(\d+)\s*calories/);
    const proteinMatch = summary.match(/(\d+)\s*g\s*of\s*protein/);
    const fatMatch = summary.match(/(\d+)\s*g\s*of\s*fat/);

    const calories = calorieMatch ? parseInt(calorieMatch[1]) : 0;
    const protein = proteinMatch ? parseInt(proteinMatch[1]) : 0;
    const fat = fatMatch ? parseInt(fatMatch[1]) : 0;

    setNutrition({ calories, protein, fat });
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  const handleAddNutrition = () => {
    if (nutrition.calories) {
      addCalories(nutrition.calories); // Call addCalories to update the global state
      addProtein(nutrition.protein); // Call addProtein to update the global state
      addFat(nutrition.fat); // Call addFat to update the global state
    }
  };

  return (
    <DetailWrapper>
      <Content>
        <h2>{details.title}</h2>
        <ImageWrapper>
          <img src={details.image} alt={details.title} />
        </ImageWrapper>
        {nutrition.calories > 0 && (
          <NutritionInfo>
            <NutritionItem>
              <strong>Calories:</strong> {nutrition.calories} kcal
            </NutritionItem>
            <NutritionItem>
              <strong>Protein:</strong> {nutrition.protein} g
            </NutritionItem>
            <NutritionItem>
              <strong>Fat:</strong> {nutrition.fat} g
            </NutritionItem>
          </NutritionInfo>
        )}
        <AddButton onClick={handleAddNutrition}>Add to Calorie Tracker</AddButton>
      </Content>
      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <TextContent>
            <div dangerouslySetInnerHTML={{ __html: details.summary }} />
            <div dangerouslySetInnerHTML={{ __html: details.instructions }} />
          </TextContent>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  
  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  ul {
    margin-top: 1rem;
  }
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  
  h2{
    font-size: 20px;
  }

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const ImageWrapper = styled.div`
  img {
    max-width: 250px;
    height: auto;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
`;

const NutritionInfo = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const NutritionItem = styled.p`
  margin: 0;
`;

const AddButton = styled.button`
  background-color: teal;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #238b79;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  margin-top: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-radius: 10px; /* Adjust the value to make it rounder */
    transform: scale(1.1); /* Adjust the value to make it a bit bigger */
  }

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Info = styled.div`
  margin-top: 2rem;
  text-align: center;
  max-width: 600px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 2rem;
    text-align: left;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: #f4f4f4;
    border-radius: 5px;
  }
`;

const TextContent = styled.div`
  margin-top: 20px;
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.5;
`;

export default Recipe;
