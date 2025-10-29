import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Currency {
  code: string;
  name: string;
  value: number;
  previous: number;
  change: number;
}

interface Crypto {
  code: string;
  name: string;
  value: number;
  change_24h: number;
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [userScore, setUserScore] = useState(250);
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completedTests, setCompletedTests] = useState(12);
  const [prevLevel, setPrevLevel] = useState(Math.floor(250 / 100) + 1);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: 'Продукты', amount: 15000, date: '2025-10-15' },
    { id: 2, category: 'Транспорт', amount: 5000, date: '2025-10-18' },
    { id: 3, category: 'Развлечения', amount: 8000, date: '2025-10-20' }
  ]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setRatesLoading(true);
        const response = await fetch('https://functions.poehali.dev/b4bf2fc9-ba84-4a6e-a3b0-d69ff2665f40');
        const data = await response.json();
        setCurrencies(data.currencies || []);
        setCrypto(data.crypto || []);
      } catch (error) {
        console.error('Failed to fetch rates:', error);
      } finally {
        setRatesLoading(false);
      }
    };

    fetchRates();
  }, []);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Правило 50/30/20',
      description: 'Оптимальное распределение доходов: 50% на необходимое, 30% на желаемое, 20% на сбережения. Этот принцип помогает поддерживать финансовый баланс.',
      category: 'Базовые принципы',
      icon: 'PieChart'
    },
    {
      id: 2,
      title: 'Сила сложного процента',
      description: 'Если инвестировать 10,000₽ ежемесячно под 12% годовых, через 20 лет накопится более 10 млн рублей. Время — ваш главный союзник в инвестициях.',
      category: 'Инвестиции',
      icon: 'TrendingUp'
    },
    {
      id: 3,
      title: 'Подушка безопасности',
      description: 'Эксперты рекомендуют иметь запас средств на 3-6 месяцев жизни. Это защитит вас от непредвиденных обстоятельств и даст финансовую стабильность.',
      category: 'Накопления',
      icon: 'Shield'
    },
    {
      id: 4,
      title: 'Диверсификация рисков',
      description: 'Не храните все яйца в одной корзине. Распределение капитала между разными активами снижает риски и повышает стабильность портфеля.',
      category: 'Риски',
      icon: 'Layers'
    },
    {
      id: 5,
      title: 'Правило 72',
      description: 'Разделите 72 на годовую процентную ставку — получите количество лет, за которое ваши деньги удвоятся. При 10% годовых это произойдёт за 7.2 года.',
      category: 'Инвестиции',
      icon: 'Calculator'
    },
    {
      id: 6,
      title: 'Инфляция съедает сбережения',
      description: 'При инфляции 5% через 14 лет покупательная способность ваших денег уменьшится вдвое. Важно инвестировать, а не просто хранить деньги.',
      category: 'Экономика',
      icon: 'TrendingDown'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Что такое инфляция?',
      options: [
        'Рост цен на товары и услуги',
        'Снижение курса валюты',
        'Увеличение зарплат',
        'Уменьшение налогов'
      ],
      correctAnswer: 0,
      difficulty: 'easy',
      points: 10
    },
    {
      id: 2,
      question: 'Какой процент дохода рекомендуется откладывать ежемесячно?',
      options: ['5-10%', '10-20%', '20-30%', '30-40%'],
      correctAnswer: 1,
      difficulty: 'easy',
      points: 10
    },
    {
      id: 3,
      question: 'Что означает термин "диверсификация портфеля"?',
      options: [
        'Продажа всех активов',
        'Распределение инвестиций между разными активами',
        'Покупка одного вида акций',
        'Хранение денег в банке'
      ],
      correctAnswer: 1,
      difficulty: 'medium',
      points: 20
    },
    {
      id: 4,
      question: 'Что такое ликвидность актива?',
      options: [
        'Его прибыльность',
        'Скорость превращения в деньги',
        'Размер налога',
        'Срок владения'
      ],
      correctAnswer: 1,
      difficulty: 'hard',
      points: 30
    }
  ];

  const leaderboard = [
    { name: 'Алексей М.', score: 580, rank: 1 },
    { name: 'Мария К.', score: 520, rank: 2 },
    { name: 'Вы', score: userScore, rank: 8 },
    { name: 'Дмитрий П.', score: 420, rank: 3 },
    { name: 'Елена С.', score: 390, rank: 4 }
  ].sort((a, b) => b.score - a.score);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Первые шаги',
      description: 'Пройдите первый тест',
      icon: 'Star',
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 2,
      title: 'Знаток финансов',
      description: 'Пройдите 10 тестов',
      icon: 'BookOpen',
      unlocked: true,
      progress: 12,
      maxProgress: 10
    },
    {
      id: 3,
      title: 'Мастер накоплений',
      description: 'Наберите 500 баллов опыта',
      icon: 'Trophy',
      unlocked: false,
      progress: 250,
      maxProgress: 500
    },
    {
      id: 4,
      title: 'Планировщик',
      description: 'Добавьте 20 расходов в планер',
      icon: 'Calendar',
      unlocked: false,
      progress: 3,
      maxProgress: 20
    },
    {
      id: 5,
      title: 'Эксперт экономики',
      description: 'Прочитайте все экономические факты',
      icon: 'Lightbulb',
      unlocked: false,
      progress: 0,
      maxProgress: 4
    },
    {
      id: 6,
      title: 'Легенда',
      description: 'Наберите 1000 баллов опыта',
      icon: 'Crown',
      unlocked: false,
      progress: 250,
      maxProgress: 1000
    }
  ];

  const userLevel = Math.floor(userScore / 100) + 1;
  const xpForNextLevel = ((userLevel) * 100);
  const xpProgress = ((userScore % 100) / 100) * 100;

  useEffect(() => {
    if (userLevel > prevLevel) {
      toast({
        title: "🎉 Новый уровень!",
        description: `Поздравляем! Вы достигли уровня ${userLevel}`,
        duration: 5000,
      });
      setPrevLevel(userLevel);
    }
  }, [userLevel, prevLevel, toast]);

  const checkAchievements = (newScore: number, newTestCount: number) => {
    if (newTestCount === 1 && completedTests === 0) {
      toast({
        title: "🏆 Достижение получено!",
        description: "Первые шаги - Пройдите первый тест",
        duration: 5000,
      });
    }
    if (newTestCount === 10 && completedTests < 10) {
      toast({
        title: "🏆 Достижение получено!",
        description: "Знаток финансов - Пройдите 10 тестов",
        duration: 5000,
      });
    }
    if (newScore >= 500 && userScore < 500) {
      toast({
        title: "🏆 Достижение получено!",
        description: "Мастер накоплений - Наберите 500 баллов опыта",
        duration: 5000,
      });
    }
    if (newScore >= 1000 && userScore < 1000) {
      toast({
        title: "🏆 Достижение получено!",
        description: "Легенда - Наберите 1000 баллов опыта",
        duration: 5000,
      });
    }
  };

  const handleAnswerSubmit = (questionId: number) => {
    const question = quizQuestions.find(q => q.id === questionId);
    if (question && selectedAnswer === question.correctAnswer) {
      const newScore = userScore + question.points;
      const newTestCount = completedTests + 1;
      
      setUserScore(newScore);
      setCompletedTests(newTestCount);
      
      toast({
        title: "✅ Правильный ответ!",
        description: `+${question.points} XP получено`,
        duration: 3000,
      });
      
      checkAchievements(newScore, newTestCount);
    } else {
      toast({
        title: "❌ Неправильно",
        description: "Попробуйте еще раз!",
        variant: "destructive",
        duration: 3000,
      });
    }
    setCurrentQuiz(null);
    setSelectedAnswer(null);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetLimit = 50000;
  const budgetUsage = (totalExpenses / budgetLimit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center animate-fade-in">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl shadow-lg">
              <Icon name="Sparkles" size={32} className="animate-pulse" />
              <h1 className="text-4xl font-heading font-bold">FinEasy</h1>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Твой путь к финансовой свободе начинается здесь
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto h-auto p-2 bg-white/80 backdrop-blur rounded-2xl shadow-lg">
            <TabsTrigger value="home" className="flex flex-col gap-1 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all">
              <Icon name="Home" size={20} />
              <span className="text-sm font-medium">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex flex-col gap-1 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all">
              <Icon name="Newspaper" size={20} />
              <span className="text-sm font-medium">Новости</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex flex-col gap-1 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all">
              <Icon name="Brain" size={20} />
              <span className="text-sm font-medium">Тесты</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex flex-col gap-1 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all">
              <Icon name="Calendar" size={20} />
              <span className="text-sm font-medium">Планер</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-purple-100 mb-1">Ваш уровень</div>
                    <div className="text-4xl font-bold font-heading flex items-center gap-2">
                      <Icon name="Zap" size={32} />
                      Уровень {userLevel}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-100 mb-1">Опыт</div>
                    <div className="text-2xl font-bold">{userScore} / {xpForNextLevel} XP</div>
                  </div>
                </div>
                <Progress value={xpProgress} className="h-4 bg-purple-300" />
                <p className="text-sm text-purple-100 mt-2">До следующего уровня: {xpForNextLevel - userScore} XP</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white overflow-hidden hover:shadow-2xl transition-all hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Trophy" size={24} />
                    Ваши баллы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold font-heading">{userScore}</div>
                  <p className="text-purple-100 mt-2">Место в рейтинге: #8</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden hover:shadow-2xl transition-all hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="BookOpen" size={24} />
                    Пройдено тестов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold font-heading">{completedTests}</div>
                  <p className="text-blue-100 mt-2">Средний балл: 85%</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-pink-500 text-white overflow-hidden hover:shadow-2xl transition-all hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Award" size={24} />
                    Достижения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold font-heading">{achievements.filter(a => a.unlocked).length}/{achievements.length}</div>
                  <p className="text-orange-100 mt-2">Получено наград</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-heading">
                  <Icon name="Target" size={28} className="text-purple-600" />
                  Достижения
                </CardTitle>
                <CardDescription className="text-base">
                  Выполняйте задания и получайте награды
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border-2 transition-all animate-slide-up ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 shadow-lg'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon name={achievement.icon} size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold font-heading">{achievement.title}</h4>
                            {achievement.unlocked && (
                              <Badge className="bg-yellow-500 text-white border-0">
                                <Icon name="Check" size={14} className="mr-1" />
                                Получено
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          {!achievement.unlocked && (
                            <div className="space-y-1">
                              <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                              <p className="text-xs text-gray-500">{achievement.progress} / {achievement.maxProgress}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-heading">
                  <Icon name="Rocket" size={28} className="text-purple-600" />
                  Начните обучение
                </CardTitle>
                <CardDescription className="text-base">
                  Выберите раздел и улучшайте свои знания в финансовой грамотности
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => setActiveTab('news')}
                  className="h-auto py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Newspaper" size={24} />
                    <div className="text-left">
                      <div className="font-semibold text-lg">Экономические факты</div>
                      <div className="text-sm text-purple-100">4 новых материала</div>
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => setActiveTab('quiz')}
                  className="h-auto py-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Brain" size={24} />
                    <div className="text-left">
                      <div className="font-semibold text-lg">Пройти тест</div>
                      <div className="text-sm text-blue-100">4 теста доступно</div>
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="DollarSign" size={24} />
                    Курсы валют ЦБ
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Обновляется ежедневно
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ratesLoading ? (
                    <div className="space-y-3">
                      <div className="h-16 bg-white/20 rounded-lg animate-pulse"></div>
                      <div className="h-16 bg-white/20 rounded-lg animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currencies.map((currency) => (
                        <div key={currency.code} className="p-3 bg-white/20 backdrop-blur rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-lg">{currency.code}</span>
                            <span className="text-2xl font-bold">{currency.value.toFixed(2)} ₽</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-100">{currency.name}</span>
                            <span className={`flex items-center gap-1 ${currency.change >= 0 ? 'text-yellow-300' : 'text-red-300'}`}>
                              <Icon name={currency.change >= 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
                              {currency.change >= 0 ? '+' : ''}{currency.change.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Bitcoin" size={24} />
                    Криптовалюты
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    Актуальные курсы
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ratesLoading ? (
                    <div className="space-y-3">
                      <div className="h-16 bg-white/20 rounded-lg animate-pulse"></div>
                      <div className="h-16 bg-white/20 rounded-lg animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {crypto.map((coin) => (
                        <div key={coin.code} className="p-3 bg-white/20 backdrop-blur rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-lg">{coin.code}</span>
                            <span className="text-2xl font-bold">${coin.value.toLocaleString('en-US')}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-orange-100">{coin.name}</span>
                            <span className={`flex items-center gap-1 ${coin.change_24h >= 0 ? 'text-yellow-300' : 'text-red-300'}`}>
                              <Icon name={coin.change_24h >= 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
                              {coin.change_24h >= 0 ? '+' : ''}{coin.change_24h.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-heading">
                  <Icon name="Lightbulb" size={28} className="text-purple-600" />
                  Интересные факты о финансах
                </CardTitle>
                <CardDescription>
                  Узнавайте новое каждый день
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {newsItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="border-0 shadow-lg bg-white hover:shadow-2xl transition-all hover-scale cursor-pointer overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge className="mb-2 bg-purple-100 text-purple-700 border-0">
                          {item.category}
                        </Badge>
                        <CardTitle className="text-xl font-heading flex items-center gap-2">
                          <Icon name={item.icon} size={24} className="text-purple-600" />
                          {item.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Award" size={24} />
                    Ваш прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Баллы опыта</span>
                        <span className="font-bold">{userScore} XP</span>
                      </div>
                      <Progress value={(userScore % 100)} className="h-3 bg-purple-300" />
                    </div>
                    <div className="text-sm text-purple-100">
                      До следующего уровня: {100 - (userScore % 100)} XP
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={24} className="text-purple-600" />
                    Топ игроков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.slice(0, 3).map((user, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          user.name === 'Вы' ? 'bg-purple-100 border-2 border-purple-600' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                            idx === 1 ? 'bg-gray-300 text-gray-700' :
                            'bg-orange-300 text-orange-900'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <span className="font-bold text-purple-600">{user.score} XP</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {quizQuestions.map((question, index) => (
                <Card
                  key={question.id}
                  className="border-0 shadow-lg bg-white hover:shadow-xl transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        className={`border-0 ${
                          question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        {question.difficulty === 'easy' ? 'Легкий' :
                         question.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700 border-0">
                        +{question.points} XP
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-heading">{question.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentQuiz === question.id ? (
                      <div className="space-y-3">
                        {question.options.map((option, idx) => (
                          <Button
                            key={idx}
                            variant={selectedAnswer === idx ? 'default' : 'outline'}
                            className={`w-full justify-start text-left h-auto py-3 ${
                              selectedAnswer === idx
                                ? 'bg-purple-600 text-white'
                                : 'hover:bg-purple-50'
                            }`}
                            onClick={() => setSelectedAnswer(idx)}
                          >
                            {option}
                          </Button>
                        ))}
                        <Button
                          onClick={() => handleAnswerSubmit(question.id)}
                          disabled={selectedAnswer === null}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                          Ответить
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuiz(question.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Начать тест
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planner" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PiggyBank" size={24} className="text-purple-600" />
                    Бюджет на октябрь
                  </CardTitle>
                  <CardDescription>
                    Отслеживайте свои расходы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Использовано</span>
                      <span className="font-bold">{totalExpenses.toLocaleString('ru-RU')} ₽ / {budgetLimit.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Progress value={budgetUsage} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{budgetUsage.toFixed(0)}%</div>
                      <div className="text-xs text-gray-600">Израсходовано</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{(budgetLimit - totalExpenses).toLocaleString('ru-RU')}</div>
                      <div className="text-xs text-gray-600">Остаток</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{expenses.length}</div>
                      <div className="text-xs text-gray-600">Операций</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plus" size={24} className="text-purple-600" />
                    Добавить расход
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Категория (например, Продукты)" />
                  <Input type="number" placeholder="Сумма в рублях" />
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="List" size={24} className="text-purple-600" />
                  История расходов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Icon name="ShoppingBag" size={20} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">{expense.category}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(expense.date).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-lg">{expense.amount.toLocaleString('ru-RU')} ₽</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;