import axios from 'axios';

const TENOR_API_KEY = 'AIzaSyBSJ9e3y-NcmKHBpCMsvXFHxd7-iSUdVgs';
const TENOR_BASE_URL = 'https://tenor.googleapis.com/v2/search';

// Cache local para evitar requisições desnecessárias
const gifCache: { [key: string]: string } = {};

export interface TenorGif {
  id: string;
  title: string;
  media_formats: {
    gif: {
      url: string;
      dims: number[];
      size: number;
    };
    tinygif: {
      url: string;
      dims: number[];
      size: number;
    };
  };
}

export interface TenorResponse {
  results: TenorGif[];
}

export const getExerciseGif = async (exerciseName: string): Promise<string | null> => {
  try {
    // Verifica se já temos o GIF em cache
    if (gifCache[exerciseName]) {
      console.log(`GIF em cache para "${exerciseName}": ${gifCache[exerciseName]}`);
      return gifCache[exerciseName];
    }

    const searchTerms = getSearchTerms(exerciseName);
    
    for (const term of searchTerms) {
      console.log(`Buscando GIF para "${exerciseName}" com termo: "${term}"`);
      
      const response = await axios.get<TenorResponse>(TENOR_BASE_URL, {
        params: {
          key: TENOR_API_KEY,
          q: term,
          limit: 1,
          media_filter: 'gif',
          contentfilter: 'medium'
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        const gifUrl = response.data.results[0].media_formats.gif.url;
        console.log(`GIF encontrado para "${exerciseName}": ${gifUrl}`);
        
        // Salva no cache
        gifCache[exerciseName] = gifUrl;
        
        return gifUrl;
      }
    }
    
    console.log(`Nenhum GIF encontrado para: ${exerciseName}`);
    return null;
  } catch (error) {
    console.error('Erro ao buscar GIF:', error);
    return null;
  }
};

const getSearchTerms = (exerciseName: string): string[] => {
  const exerciseTerms: { [key: string]: string[] } = {
    'Agachamento': ['squat exercise', 'squat workout', 'leg squat', 'barbell squat'],
    'Supino Reto': ['bench press', 'chest press', 'barbell bench press', 'gym bench press'],
    'Remada Baixa': ['seated row', 'cable row', 'rowing exercise', 'back row'],
    'Desenvolvimento de Ombros': ['shoulder press', 'overhead press', 'dumbbell press', 'shoulder workout'],
    'Puxada na Polia Alta': ['lat pulldown', 'pull down', 'back pulldown', 'lat exercise'],
    'Mesa Flexora': ['leg curl', 'hamstring curl', 'leg exercise', 'hamstring workout'],
    'Prancha': ['plank exercise', 'plank workout', 'core plank', 'abdominal plank'],
    'Crunch': ['abdominal crunch', 'abs crunch', 'sit up', 'ab workout'],
    'Cardio Leve': ['cardio workout', 'running', 'treadmill', 'cardio exercise']
  };

  return exerciseTerms[exerciseName] || [exerciseName.toLowerCase()];
};

// Função para pré-carregar GIFs de todos os exercícios
export const preloadExerciseGifs = async (exercises: any[]): Promise<{ [key: string]: string }> => {
  const gifMap: { [key: string]: string } = {};
  
  const promises = exercises.map(async (exercise) => {
    const gifUrl = await getExerciseGif(exercise.name);
    if (gifUrl) {
      gifMap[exercise.id] = gifUrl;
    }
  });

  await Promise.all(promises);
  return gifMap;
};