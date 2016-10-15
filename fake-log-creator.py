# A small script to create E:D Logs for testing purposes
import sys

system_names = [
    "FooBar 1b-a",
    "FooBar 2c-f",
    "Other c6-55",
    "TestSystem 76-g7",
    "LHS 31415",
    "Dahan",
    "Totally Not A System",
    "I Am A System",
    "This System Does Not Exist",
    "Wregoe I-do nt-exist"
]

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: fake-log-creator.py <location>")
        sys.exit(1)
    location = sys.argv[1]
    print("Creating log file: " + location + "...")
    with open(location, "w") as f:
        f.write("Some text because logs are dirty :P\r\n")
        f.write("{00:00:15} First Log Message ever\r\n")

    print("Commands:")
    print("s - Enter new system")
    print("d - Drop from SC")
    print("q - Quit")
    i = 0
    while True:
        system = system_names[i]
        i = (i + 1) % 10
        with open(location, "a") as f:
            c = input("Enter command:")
            if c == "s":
                f.write('{01:01:02} System:23(' + system + ') Body:0 Pos:(-1.22e+010,7.87e+009,4.88e+009) Supercruise\r\n')
            elif c == "d":
                f.write('{01:02:03} System:"' + system + '" StarPos:(1.0,8.0,-1.0)ly Body:4 RelPos:(-4.9,-3.4,8.5)km NormalFlight\r\n')
            elif c == "q":
                sys.exit(1)
