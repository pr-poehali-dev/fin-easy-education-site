"""
Business: Генерация актуальных экономических фактов на каждый день
Args: event - dict с httpMethod
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с экономическими фактами дня
"""
import json
from typing import Dict, Any, List
from datetime import datetime
import hashlib


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    all_facts: List[Dict[str, str]] = [
        {
            'title': 'Правило 50/30/20',
            'description': 'Оптимальное распределение доходов: 50% на необходимое, 30% на желаемое, 20% на сбережения. Этот принцип помогает поддерживать финансовый баланс.',
            'category': 'Базовые принципы',
            'icon': 'PieChart'
        },
        {
            'title': 'Сила сложного процента',
            'description': 'Если инвестировать 10,000₽ ежемесячно под 12% годовых, через 20 лет накопится более 10 млн рублей. Время — ваш главный союзник в инвестициях.',
            'category': 'Инвестиции',
            'icon': 'TrendingUp'
        },
        {
            'title': 'Подушка безопасности',
            'description': 'Эксперты рекомендуют иметь запас средств на 3-6 месяцев жизни. Это защитит вас от непредвиденных обстоятельств и даст финансовую стабильность.',
            'category': 'Накопления',
            'icon': 'Shield'
        },
        {
            'title': 'Диверсификация рисков',
            'description': 'Не храните все яйца в одной корзине. Распределение капитала между разными активами снижает риски и повышает стабильность портфеля.',
            'category': 'Риски',
            'icon': 'Layers'
        },
        {
            'title': 'Правило 72',
            'description': 'Разделите 72 на годовую процентную ставку — получите количество лет, за которое ваши деньги удвоятся. При 10% годовых это произойдёт за 7.2 года.',
            'category': 'Инвестиции',
            'icon': 'Calculator'
        },
        {
            'title': 'Инфляция съедает сбережения',
            'description': 'При инфляции 5% через 14 лет покупательная способность ваших денег уменьшится вдвое. Важно инвестировать, а не просто хранить деньги.',
            'category': 'Экономика',
            'icon': 'TrendingDown'
        },
        {
            'title': 'Эффект латте',
            'description': 'Ежедневная покупка кофе за 200₽ обходится в 73,000₽ в год. Если инвестировать эти деньги под 10% годовых, за 10 лет накопится 1.2 млн рублей.',
            'category': 'Экономия',
            'icon': 'Coffee'
        },
        {
            'title': 'Налоговые вычеты',
            'description': 'Можно вернуть 13% от расходов на обучение, лечение и покупку жилья. На инвестиционный вычет можно вернуть до 52,000₽ в год.',
            'category': 'Налоги',
            'icon': 'FileText'
        },
        {
            'title': 'Индекс потребительских цен',
            'description': 'ИПЦ измеряет изменение стоимости потребительской корзины. В 2024 году средняя инфляция в России составила около 7.5%.',
            'category': 'Экономика',
            'icon': 'BarChart3'
        },
        {
            'title': 'Золотое правило инвестиций',
            'description': 'Вычтите свой возраст из 100 — столько процентов портфеля держите в акциях. Остальное — в облигациях. С возрастом снижайте риски.',
            'category': 'Инвестиции',
            'icon': 'Scale'
        },
        {
            'title': 'Эффект домино в экономике',
            'description': 'Повышение ключевой ставки ЦБ влияет на ипотеку, кредиты, депозиты и курс рубля. Одно решение запускает цепную реакцию в экономике.',
            'category': 'Экономика',
            'icon': 'GitBranch'
        },
        {
            'title': 'Страховка вкладов',
            'description': 'АСВ страхует вклады до 1.4 млн рублей в каждом банке. Чтобы защитить больше денег, распределите их между разными банками.',
            'category': 'Безопасность',
            'icon': 'ShieldCheck'
        },
        {
            'title': 'Ребалансировка портфеля',
            'description': 'Раз в год пересматривайте соотношение активов в портфеле. Продавайте подорожавшие активы и докупайте подешевевшие для поддержания баланса.',
            'category': 'Инвестиции',
            'icon': 'RefreshCw'
        },
        {
            'title': 'Доллар-кост усреднение',
            'description': 'Регулярные инвестиции фиксированной суммы снижают влияние волатильности. Покупая регулярно, вы усредняете цену входа в рынок.',
            'category': 'Стратегии',
            'icon': 'TrendingUp'
        }
    ]
    
    today = datetime.now().date()
    day_hash = hashlib.md5(str(today).encode()).hexdigest()
    seed = int(day_hash[:8], 16)
    
    daily_facts = []
    indices_used = set()
    
    for i in range(6):
        index = (seed + i * 7) % len(all_facts)
        while index in indices_used:
            index = (index + 1) % len(all_facts)
        indices_used.add(index)
        
        fact = all_facts[index].copy()
        fact['id'] = index + 1
        daily_facts.append(fact)
    
    result = {
        'facts': daily_facts,
        'date': str(today),
        'total_available': len(all_facts)
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=86400'
        },
        'body': json.dumps(result, ensure_ascii=False),
        'isBase64Encoded': False
    }
