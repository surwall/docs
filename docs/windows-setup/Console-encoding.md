Windows console app(C++) not output utf-8 by default. 
You wanna add the following line into your main method.
```c++
#include <windows.h>
int main()
{
    
    SetConsoleOutputCP(65001);
    std::cout << "你好" << std::endl;
}
```

As for dotnet console programs
```csharp
static void Main(string[] args)
{
    Console.OutputEncoding = Encoding.UTF8;
    Console.WriteLine("你好世界");
}
```

